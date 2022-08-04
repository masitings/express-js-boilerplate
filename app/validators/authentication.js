const { body } = require('express-validator');

exports.validateLogin = () => {
    return [
        body('wallet_address').isString()
    ];
}

exports.validateRegister = () => {
    return [
        body('wallet_address').isString(),
    ]
}