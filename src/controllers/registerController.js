const { async } = require('regenerator-runtime');
const Register = require('../models/registerModel');
exports.index = (req, res) => {
    res.render('register');
    return;
};

exports.formulario = async (req, res) => {
    try {
        const resgister = new Register(req.body);
        await resgister.registe();
        if (resgister.erros.length > 0) {
            req.flash('erros', resgister.erros);
            req.session.save(function () {
                return res.redirect('/register');

            });
            return;
        }
        req.flash('success', 'Seu usúario foi criado com Sucesso');
        req.session.save(function () {
            return res.redirect('/register');

        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}