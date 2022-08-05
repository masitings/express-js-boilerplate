const { PrismaClient } = require('@prisma/client');
const response = require('./../utils/response');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

exports.account = async (req, res, next) => {
    // Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        response.resJson(res, 400, false, 'Validation error', {errors: errors.array()});
    }
    // End validation error

    const { wallet_address } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            address: wallet_address
        }
    });

    if (user) {
        response.resJson(res, 200, true, 'My Account', {
            email: user.email,
            username: user.username,
            address: user.address
        });
    }
}

exports.updateAccount = async (req, res, next) => {
    // Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        response.resJson(res, 400, false, 'Validation error', {errors: errors.array()});
    }
    // End validation error
    const { wallet_address, username, email } = req.body;
    const user = await prisma.user.update({
        where: {
            address: wallet_address
        },
        data: {
            username: username,
            email: email
        }
    });
    if (user) {
        response.resJson(res, 200, true, 'Account has been updated successfully.');
    }
}