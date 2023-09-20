const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {

}
module.exports = Login;