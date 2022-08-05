const jwt = require('jsonwebtoken');
const { body, header } = require('express-validator');
const response = require('./../utils/response');

exports.checkAuth = () => {
    return header('authorization').custom(async (value, {req}) => {
        const token = value && value.split(' ')[1];
        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if (err) {
                throw new Error('Invalid token');
            }
            req.body.wallet_address = user.wallet_address;
            return true;
        });
    });
}

exports.signIn = (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn: '2h'});
}

exports.authenticateToken = () => {
    return [
       this.checkAuth() 
    ]
}

exports.updateAccount = () => {
    return [
        this.checkAuth(),
        body('username').isString().withMessage('Username is required'),
        body('email').isEmail().withMessage('Email address is required')
    ]
}