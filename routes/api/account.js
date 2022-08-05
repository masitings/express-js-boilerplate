const express = require('express');
const route = express.Router();

const accountController = require('../../app/controllers/account');
const jwtAuth = require('../../app/utils/jwt');

route.get('/', jwtAuth.authenticateToken, accountController.account);

module.exports = route;