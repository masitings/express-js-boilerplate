const express = require('express');
const route = express.Router();

const accountController = require('../../app/controllers/account');
const accountValidator = require('../../app/validators/account');

route.all('/', async (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'You are not suppose to be here'
    });
});

route.get('/', accountController.)