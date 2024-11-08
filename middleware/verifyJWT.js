const mongoose = require('mongoose')
const Schemas = require('../models/Schemas');
const DBcon = require('../config/dbconn')

const jwt = require('jsonwebtoken');

const dbClient = mongoose.connection.useDb(DBcon.dbName)
const User = dbClient.model('users', Schemas.userSchema);


const verifyJWT = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        if (!req.cookies.accessToken)
            return res.sendStatus(401);
        token = req.cookies.accessToken;
    }
    else
        token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Invalid Token
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )

}
module.exports = { verifyJWT };