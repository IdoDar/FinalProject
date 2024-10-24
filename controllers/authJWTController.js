const User = require('../model/Users');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogIn = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ 'Message': 'Username & Password are required' });
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    //check password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // Create JWT while Auth
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 15 * 60 * 1000 })
        res.json({ accessToken })
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
    const duplicate = await User.findOne({ username: user }).exec();
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

        console.log(result);
        res.status(201).json({ 'success': `New User ${user} created` });
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
            if (err || foundUser.username != decoded.username) return res.sendStatus(403); // Invalid Token
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
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

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
    return res.sendStatus(204); //No Content
};

module.exports = { handleNewUser, handleLogIn, handleRefreshToken, handleLogout };
