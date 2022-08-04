require('dotenv').config();

const {PrismaClient} = require('@prisma/client');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
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
        const login = await prisma.user.findUnique({
            where: {
                address: wallet_address
            }
        });
        res.send(login);
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
            const token = jwt.sign({
                address: user.address
            }, process.env.SECRET_TOKEN, { expiresIn: '2h' });
            res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
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
