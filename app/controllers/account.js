const { PrismaClient } = require('@prisma/client');

exports.account = async (req, res, next) => {
    res.send(req.body.user);
}