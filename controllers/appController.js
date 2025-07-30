const passport = require('passport');
const db = require('../storages/queries');
const bcrypt = require('bcryptjs');

exports.loginGet = (req, res) => {
    res.render('login', {
        user: req.user
    });
};

exports.signupGet = (req, res) => { 
    res.render('signup', {
        title: 'Account Sign Up'
    });
};

exports.signupPost = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword
        };
        db.addUser(user);
        res.redirect('/');
    } catch (error) {
        return next(error);
    }
};

exports.loginPost = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
});

exports.logoutPost = (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        res.redirect('/');
    });
};