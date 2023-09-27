import validator from "validator";

export default class Login {
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
        const email = el.querySelector('input[name="email"]');
        const senha = el.querySelector('input[name="senha"]');
        let error = false;

        if(!validator.isEmail(email.value)) {
            this.createError(email ,'Email invalido')
            error = true;
        }
        if(senha.value.length < 8 || senha.value.length > 16){
            this.createError(senha,`A senha que tem ter 8 ou 16 caracteres`)
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