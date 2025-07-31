const passport = require('passport');
const db = require('../storages/queries');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const usernameErr = 'must be an email format, example@domain.com.';
const passwordLengthErr = 'must by at least 8 characters long.';
const passwordContainsErr = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)';
const passwordConfirmErr = 'Passwords do not match.';

const validateUser = [
    body('username').trim()
    .isEmail().withMessage(`Email ${usernameErr}`),
    body('password').trim()
    .isLength({ min: 8 }).withMessage(`Password ${passwordLengthErr}`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/).withMessage(passwordContainsErr),
    body('passwordConfirm').trim()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error(passwordConfirmErr);
        }
        return true;
    }).withMessage(passwordConfirmErr)
];

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

exports.signupPost = [
    validateUser, 
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).render('signup', {
                title: 'Account Sign Up',
                errors: errors.array(),
            });
        }

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
        }; 
    }
];

exports.loginPost = passport.authenticate('local', {
    successRedirect: '/messages',
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