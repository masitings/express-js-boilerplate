const express = require('express');
const router = express.Router();

// Validator and Controller
const authController = require('../../app/controllers/authentication');
const { authentication, account } = require('./../../app/validators/index');


//Declare route here
router.all('/', async (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'You are not suppose to be here'
    });
});

router.post('/login', authentication.validateLogin(), authController.login);
router.post('/register', authentication.validateRegister(), authController.register);
router.post('/refresh-token', account.checkAuth(), authController.refreshToken);

module.exports = router;