const express = require('express');
const route = express.Router();

const accountController = require('../../app/controllers/account');
const accountValidator = require('../../app/validators/account');

route.get('/', accountValidator.authenticateToken(), accountController.account);
route.put('/update', accountValidator.updateAccount(), accountController.updateAccount);

module.exports = route;