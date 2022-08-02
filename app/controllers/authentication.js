const { validationResult } = require('express-validator');

const { user } = require('./../../models/index');

exports.login = async (req, res, next) => {

    // Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // End validation error
    const { email, password } = req.body;
    res.send(email + ' - ' + password);
}

exports.register = async (req, res, next) => {
    // Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // End validation error
    const { name, email, password } = req.body;
    const [model, created ] = await user.findOrCreate({
        where: {
            email: email,
        },
        defaults: {
            password: password,
            name: name,
            email: email,
        }
    });

    if (created) {
        // User created
    } else {
        // User exists
    }
}
