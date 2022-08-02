const { body } = require('express-validator');

exports.validateLogin = () => {
    return [
        body('email').exists().isEmail(),
        body('password').exists()
    ];
}

exports.validateRegister = () => {
    return [
        body('name').exists().isString(),
        body('email').isEmail(),
        body('password').exists(),
        body('confirm_password').custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
    ]
}