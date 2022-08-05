const express = require('express');
const router = express.Router();

const authRoute = require('./api/authentication');
const accountRoute = require('./api/account');

router.get('/', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'You are not suppose to be here.'
    });
});

// Declare your routes below.
router.use('/auth', authRoute);
router.use('/account', accountRoute);


module.exports = router;