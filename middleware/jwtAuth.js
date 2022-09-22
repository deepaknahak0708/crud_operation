const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
// const User = require('../models/userModel');

module.exports = (roles) => (req, res, next) => {
    try {
        const authorization = req.get('Authorization');
        if (!authorization) {
            res.status(400).json({
                success: true,
                message: 'You are not Authorized'
            })
        }

        const splitToken = authorization.split(" ");
        const authToken = splitToken[1];

        let decode
        try {
            decode = jwt.verify(authToken, process.env.SECRETE)

        } catch (error) {
            res.status(400).json({
                success: true,
                message: 'You are not Authorized',
                data: error
            })
        }

        const role = decode.role
        if (roles.includes(role)) {
            // user.role = decode;
            req.user = decode;
            next()
        }
        else {
            res.status(400).json({
                success: true,
                message: 'You are not Authorized'
            })
        }

    } catch (err) {
         res.status(401).json({
            success: false,
            message: err.message
        });
    }
}