require('dotenv').config();

const jwt = require('jsonwebtoken');

exports.signIn = async (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn: '2h'});
}