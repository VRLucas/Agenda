const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');

// Rotas da Home
route.get('/', homeController.index);

route.get('/login',loginController.index);
route.post('/login',loginController.login);
route.get('/login/logout',loginController.logout);
route.get('/register', registerController.index);
route.post('/register', registerController.formulario);

module.exports = route;