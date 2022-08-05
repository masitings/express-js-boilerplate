const { PrismaClient, Prisma } = require('@prisma/client');
const response = require('./../utils/response')
const { validation_handler } = require('./../validators/index');

const prisma = new PrismaClient();


exports.account = async (req, res, next) => {
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
        response.resJson(res, 200, true, 'My Account', {
            email: user.email,
            username: user.username,
            address: user.address
        });
    }
}

exports.updateAccount = async (req, res, next) => {
    // Validation error
    validation_handler(req, res);
    // End validation error
    try {
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
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
              response.resJson(res, 400, false, 'The email address or username has been taken.');
            }
        }
    }

}
