const { async } = require("regenerator-runtime");
const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    res.render('contato', { contato: {} });
    return;
}
exports.cadastro = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.cadastro();

        if (contato.erros.length > 0) {
            req.flash('erros', contato.erros);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
        req.flash('success', 'Contato cadastrado com sucesso');
        req.session.save(() => res.redirect(`/${contato.contato._id}`));
        return;

    } catch (e) {
        console.log(e);
        return res.render('404');
    }


}
exports.editIndex = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contato = await new Contato(req.params.id);
        contato.buscaPorId(req.params.id);
        if (!contato) return res.render('404');

        res.render('contato', { contato });

    } catch (e) {
        console.log(e);
        return res.render('404');

    }


}