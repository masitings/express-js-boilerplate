const jwt = require('jsonwebtoken');


module.exports = {
    signIn: function (user) {
        return jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn: '2h'});
    },
    authenticateToken: function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            console.log(err);
            if (err) return res.sendStatus(403);
            req.body.user = user;
            console.log(req.user);
            next();
        });
    }
}
