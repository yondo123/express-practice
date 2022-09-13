exports.loginState = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.state(403).send('Not Login');
    }
};

exports.notLoginState = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('Already Login');
        res.redirect(`/?error=${message}`);
    }
};
