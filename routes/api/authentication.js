const express = require('express');
const router = express.Router();

// Validator and Controller
const authController = require('../../app/controllers/authentication');
const authValidator = require('../../app/validators/authentication');

//Declare route here
router.all('/', async (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'You are not suppose to be here'
    });
});

router.post('/login', authValidator.validateLogin(), authController.login);
router.post('/register', authValidator.validateRegister(), authController.register);

module.exports = router;