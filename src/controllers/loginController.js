const Login = require('../models/registerModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('logado');
    res.render('login');
    return;
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.sinIn();
        if (login.erros.length > 0) {
            req.flash('erros', login.erros);
            req.session.save(function () {
                return res.redirect('/login');

            });
            return;
        }
        req.flash('success', 'Login foi efetuado com sucessso');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/login');

        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}
exports.logout = (req, res) => {
    req.session.destroy(function () {
        return res.redirect('/');
    });
}