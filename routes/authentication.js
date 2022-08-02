const express = require('express');
const router = express.Router();

// Validator and Controller
const authController = require('./../controllers/authentication');
const authValidator = require('./../validators/authentication');

//Declare route here
router.post('/login', authValidator.validateLogin(), authController.login);
router.post('/register', authValidator.validateRegister(), authController.register);

module.exports = router;