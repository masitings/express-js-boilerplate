const {PrismaClient} = require('@prisma/client');
const response = require('./../utils/response');
const { validation_handler } = require('./../validators/index');
const auth = require('./../utils/jwt');

const prisma = new PrismaClient();


exports.login = async (req, res, next) => {
    // Validation error
    validation_handler(req, res);
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
            const token = await auth.signIn(userJson);
            res.status(200).json({
                success: true,
                token: token,
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
    validation_handler(req, res);
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
            const token = await auth.signIn(userJson);
            response.resJson(res, 200, true, 'Registration success', {
                token: token,
            });
        }
    } catch (err) {
        response.resJson(res, 400, false, 'That wallet has been registered before');
    }
}

exports.refreshToken = async (req, res, next) => {
    // Validation error
    validation_handler(req, res);
    // End validation error
    const { wallet_address } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            address: wallet_address
        }
    });
    if (user) {
        const userJson = { wallet_address: user.address };
        const token = await auth.signIn(userJson);
        response.resJson(res, 200, true, 'Token refreshed', {
            token: token
        });
    }
}