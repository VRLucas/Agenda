import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/style.css';

import Login from '../frontend/assets/modulos/login'
import Cadastro from './assets/modulos/cadastro';

const login = new Login('.form-login');
const cadastro = new Cadastro('.form-cadastro');

login.init();
cadastro.init();

