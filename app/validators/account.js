const { body, header } = require('express-validator');
const jwt = require('./../utils/jwt');

exports.validateToken = () => {
    return [
        header('authorization').custom((value, { req, res, next}) => {
            const token = value && value.split(' ')[1];
            if (token === null) return Promise.reject('Invalid token');

            jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
                return true;
            });
            return false;
        })
    ];
}