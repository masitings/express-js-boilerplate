const express = require('express');
const route = express.Router();

const accountController = require('../../app/controllers/account');
const { account } = require('./../../app/validators/index');

route.get('/', account.checkAuth(), accountController.account);
route.put('/update', account.update(), accountController.updateAccount);

module.exports = route;