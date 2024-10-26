const User = require('../model/Users');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            { expiresIn: '1m' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 15 * 60 * 1000 })
        res.json({ 'accessToken': accessToken, 'Usernmae': foundUser.username })
    }
    else {
        return res.sendStatus(401); // Unauthorized
    }
}

const handleNewUser = async (req, res) => {
    const { user, password, rpwd, email, phoneNumber } = req.body;
    if (!user || !password || !rpwd || !email || !phoneNumber) return res.status(400).json({ 'Message': 'you must fill all the fields bellow' });
    if (password != rpwd) return res.status(400).json({ 'Message': 'check your password' });
    //check for duplicate usernames
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //conflict
    try {
        //encrypt password
        const hashpwd = await bcrypt.hash(password, 10);

        //Create store new user
        const result = await User.create({
            "username": user,
            "email": email,
            "phoneNumber": phoneNumber,
            "password": hashpwd
        });

        res.status(201).json({ 'success': `New User ${user} created with email ${email}` });
    }
    catch (err) {
        res.status(500).json({ 'Message': err.Message });
    }
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
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
                { expiresIn: '1m' }
            );
            res.json({ 'accessToken': accessToken, 'Usernmae': foundUser.username });
        }
    )
}

const handleLogout = async (req, res) => {
    //On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204); //No Content
    const refreshToken = cookies.jwt;

    //Is RefreshToken in DB
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204); //No Content
    }
    //delete the refreshToken From DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204); //No Content
};

module.exports = { handleNewUser, handleLogIn, handleRefreshToken, handleLogout };
