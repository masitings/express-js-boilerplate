const { validationResult } = require('express-validator');

const { user } = require('./../models/index');

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
    user.findOrCreate({
        where: {
            email: email,
            name: name,
            password: password
        },
    }).then((result) => {
        return res.send(result);
    }).catch((err) => {
        return res.send(JSON.stringify(err));
    })
}
