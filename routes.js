const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da Home
route.get('/', homeController.index);

// Rotas de Login
route.get('/login', loginController.index);
route.post('/login', loginController.login);
route.get('/login/logout', loginController.logout);
route.get('/register', registerController.index);
route.post('/register', registerController.formulario);

//Routas de Contato

route.get('/contato', loginRequired, contatoController.index);
route.post('/contato/cadastro', contatoController.cadastro);
route.get('/:id', contatoController.editIndex);

module.exports = route;