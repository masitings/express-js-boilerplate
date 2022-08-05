const {PrismaClient} = require('@prisma/client');

const { validationResult } = require('express-validator');
const jwtAuth = require('../utils/jwt');
const response = require('./../utils/response');

const prisma = new PrismaClient();


exports.login = async (req, res, next) => {
    // Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // End validation error

    try {
        const { wallet_address } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                address: wallet_address
            }
        });
        if (user) {
            const userJson = { wallet_address: user.address };
            const token = jwtAuth.signIn(userJson);
            response.resJson(res, 200, true, 'Logged in', {
                token: token
            });
        } else {
            response.resJson(res, 401, false, 'User with that wallet does not exists');
        }
    } catch (err) {
        response.resJson(res, 500, false, err);
    }
    
}

exports.register = async (req, res, next) => {

    // Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // End validation error

    try {
        const { wallet_address } = req.body;
        const nonce = Math.floor(Math.random() * 1000000);

        const user = await prisma.user.create({
            data: {
                address: wallet_address,
                nonce: nonce
            }
        });
        if (user) {
            const userJson = { wallet_address: user.address };
            const token = jwtAuth.signIn(userJson);
            response.resJson(res, 200, true, 'Registration success', {
                token: token,
            });
        }
    } catch (err) {
        response.resJson(res, 400, false, 'The wallet has been registered before');
    }
}

exports.refreshToken = async (req, res, next) => {
    // Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // End validation error

    const { token } = req.body;
    if (token == null) return res.sendStatus(401);
}