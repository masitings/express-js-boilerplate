const express = require('express');
const router = express.Router();

const authRoute = require('./authentication');

const index = (req, res) => {
    res.status(301).json({
        status: 301,
        message: 'You are not suppose to be here.'
    });
}

router.get('/', index);


// Declare your routes below.
router.use('/auth', authRoute);



module.exports = router;