const jwt = require('jsonwebtoken');
const response = require('./response');


module.exports = {
    signIn: function (user) {
        return jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn: '2h'});
    },
    authenticateToken: function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            response.resJson(res, 401, false, "You need to logged in before accessing this page.");
        };

        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            console.log(err);
             if (err) {
                 response.resJson(res, 403, false, "You don't have any permission to access this page");
             }
            req.body.wallet_address = user.wallet_address;
            next();
        });
    }
}
