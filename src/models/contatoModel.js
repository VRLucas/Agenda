const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validador = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    dataCriação: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.contato = null;

    }
    async buscaPorId(id) {
        try {
            this.contato = await ContatoModel.findById(id);
            return this.contato;
            
        } catch (e) {
            console.log(e);
            
        }
        

    }
    async cadastro() {

        this.valida();
        if (this.erros.length > 0) return;
        try {
           this.contato = await ContatoModel.create(this.body);

        } catch (e) {
            console.log(e);

        }


    
    }
    valida() {
        this.cleanUp();
        if (!this.body.nome) return this.erros.push('Nome é campo Obrigadorio');
        if (this.body.email && !validador.isEmail(this.body.email)) return this.erros.push('Email Invalido');
        if (!this.body.telefone && !this.body.telefone) {
            return this.erros.push('Pelo menos um contato tem ser cadastrado');
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
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    
    }



}


module.exports = Contato;