const mongoose = require('mongoose');
const validador = require('validator');
const bcrytjs = require('bcryptjs');
const { async } = require('regenerator-runtime');

const RegisterSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true }
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }
    async registe() {
        this.valida();
        if (this.erros.length > 0) return;
        await this.userExists();
        if (this.erros.length > 0) return;
        const salt = bcrytjs.genSaltSync();

        this.body.senha = bcrytjs.hashSync(this.body.senha, salt);
        try {

            this.user = await RegisterModel.create(this.body);
        } catch (e) {
            console.log(e);
        }


    }
    async userExists() {
        const user = await RegisterModel.findOne({ email: this.body.email });
        if (user) this.erros.push('Usuário já existe');

    }

    valida() {
        this.cleanUp()
        if (!validador.isEmail(this.body.email)) this.erros.push('Email Inválido');

        if (this.body.senha.length < 8 || this.body.senha.length > 16) {
            this.erros.push(`A senha precisa ter entre 8 e 16 caracteres.`);
        }

    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        };
    }

}
module.exports = Register;