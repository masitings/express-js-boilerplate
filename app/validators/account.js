const { body } = require('express-validator');

exports.updateAccount = () => {
    return [
        body('wallet_address').isString()
    ];
}