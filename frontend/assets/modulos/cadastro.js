import validator from "validator";

export default class Cadastro {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }
    init() {
        this.eventos();

    }
    eventos() {
        if(!this.form) return;
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.validate(e)
        });

    }
    validate(e){
        const el = e.target;
        const nome = el.querySelector('input[name="nome"]')
        const sobrenome = el.querySelector('input[name="sobrenome"]');
        const email = el.querySelector('input[name="email"]');
        const telefone = el.querySelector('input[name="telefone"]');
        let error = false;
        
        if(email.value){
            if(!validator.isEmail(email.value)) {
                this.createError(email ,'Email invalido')
                error = true;
            }

        }
        if(!nome.value){
            this.createError(nome,`O nome é obrigatorio`)
            error = true
        }
        if(nome.value.length < 3 || nome.value.length > 50){
            this.createError(nome,'Nome deve ter entre 3 a 50 caracteres.')
            error = true
        }
        if(sobrenome.value.length < 3 || sobrenome.value.length > 50){
            this.createError(sobrenome,'Sobrenome deve ter entre 3 a 50 caracteres.')

        }
        if(telefone.value){
            if(!validator.isMobilePhone(telefone.value,'pt-BR')){
                this.createError(telefone,"Telefone Invalido")
                error = true
            }

        }
        if(!telefone.value && !email.value){
            this.createError(telefone,'Pelo menos cadastra um contato')
            error = true
        }
        
        if(!error) el.submit();

    }
    createError(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-message');
        campo.insertAdjacentElement('afterend', div);

    }
}