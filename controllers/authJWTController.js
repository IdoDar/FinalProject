const mongoose = require('mongoose')
const Schemas = require('../models/Schemas');
const DBcon = require('../config/dbconn')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbClient = mongoose.connection.useDb(DBcon.dbName)
const User = dbClient.model('users', Schemas.userSchema);


const handleLogIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'Message': 'Username & Password are required' });
    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    //check password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // Create JWT while Auth
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 60 * 60 * 1000 });
        res.json("Successful Login");
        console.log("User Login");
    }
    else {
        return res.sendStatus(401); // Unauthorized
    }
}

const handleNewUser = async (req, res) => {
    const { FirstName, LastName, email, phoneNumber, sex, Bdate, password, rpwd } = req.body;
    if (!FirstName || !LastName || !email || !phoneNumber || !sex || !Bdate || !password || !rpwd) return res.status(400).json({ 'Message': 'you must fill all the fields bellow' });
    if (password != rpwd) return res.status(400).json({ 'Message': 'check your password' });
    //check for duplicate usernames
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //conflict
    try {
        //encrypt password
        console.log("encrypt");
        const hashpwd = await bcrypt.hash(password, 10);
        //Create store new user
        console.log("before create");
        const result = await User.create({
            "name": FirstName + " " + LastName,
            "sex": sex,
            "email": email,
            "phoneNum": phoneNumber,
            "dateBirth": Bdate,
            "password": hashpwd
        });
        console.log("after");

        res.sendStatus(201);
        console.log("User Created");
    }
    catch (err) {
        res.status(500).json({ 'Message': err });
    }
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden
    //check JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email != decoded.email) return res.sendStatus(403); // Invalid Token
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 60 * 60 * 1000 })
        }
    )
}

const handleLogout = async (req, res) => {
    //On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204); //No Content

    //Is RefreshToken in DB
    /*const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('accessToken', { httpOnly: true });
        res.clearCookie('refreshToken', { httpOnly: true });
        return res.sendStatus(204); //No Content
    }
    delete the refreshToken From DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();*/

    res.clearCookie('accessToken', { httpOnly: true });
    res.clearCookie('refreshToken', { httpOnly: true });
    return res.sendStatus(204); //No Content
};

module.exports = { handleNewUser, handleLogIn, handleRefreshToken, handleLogout };
