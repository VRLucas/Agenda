const mongoose = require('mongoose');
const validador = require('validator');
const bcryptjs = require('bcryptjs');
const { async } = require('regenerator-runtime');

const RegisterSchema = new mongoose.Schema({
    nome: {type: String, require: true},
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
        const salt = bcryptjs.genSaltSync();

        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
        try {

            this.user = await RegisterModel.create(this.body);
        } catch (e) {
            console.log(e);
        }


    }
    async sinIn(){
        this.valida();
        this.user = await RegisterModel.findOne({ email: this.body.email, nome: this.body.nome });

        if(!this.user){
            this.erros.push('Usuário não encontrado');
            return;
        }

        if(!bcryptjs.compareSync(this.body.senha,this.user.senha)){
            this.erros.push('Senha Inválida');
            this.user = null;
            return;

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
            nome: this.body.nome,
            email: this.body.email,
            senha: this.body.senha
        };
    }

}
module.exports = Register;