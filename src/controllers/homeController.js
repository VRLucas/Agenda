
const Contato = require('../models/contatoModel')
exports.index = async (req, res) => {
    const contato = await Contato.buscaContatos();
    res.render('index', { contato });
    return;


}

