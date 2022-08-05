const { validationResult } = require('express-validator');
const response = require('./../utils/response');

const authentication = require('./authentication');
const account = require('./account');

const validation_handler = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        response.resJson(res, 400, false, 'Validation error', errors.array());
    }
}

module.exports = {
    validation_handler,
    authentication,
    account
}