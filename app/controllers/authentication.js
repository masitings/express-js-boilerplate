const {PrismaClient} = require('@prisma/client');

const { validationResult } = require('express-validator');
const prisma = new PrismaClient();
const jwtAuth = require('../utils/jwt');

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
            res.status(200).json({
                success: true,
                token: token,
            });
        }
    } catch (err) {
        res.json(err);
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
            const token = signIn(userJson);
            res.status(200).json({
                success: true,
                token: `${token}`,
                user: {
                    address: user.address,
                    username: user.username,
                    email: user.email 
                },
                msg: "You are now logged in."
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'That wallet address has been registered before'
        });
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