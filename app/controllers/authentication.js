const {PrismaClient} = require('@prisma/client');

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

    try {
        const { wallet_address } = req.body;
        const login = await prisma.user.findUnique({
            where: {
                address: wallet_address
            }
        })
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
        const user = await prisma.user.create({
            data: {
                address: wallet_address
            }
        });
        
        res.send(user);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'That wallet address has been registered before'
        });
    }
}
