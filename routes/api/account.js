const express = require('express');
const route = express.Router();

const accountController = require('../../app/controllers/account');
const accountValidator = require('../../app/validators/account');

route.get('/', accountValidator.validateToken, accountController.account);

module.exports = route;