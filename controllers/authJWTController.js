const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data }
}

const bcrypt = require('bcrypt');

const fsPromises = require('fs').promises;
const path = require('path');

const jwt=require('jsonwebtoken');
require('dotenv').config();

const handleLogIn = async (req, res) => {
    const { user, password} = req.body;
    if (!user || !password ) return res.status(400).json({ 'Message' : 'Username & Password are required'});
    const foundUser = usersDB.users.find(user1 => user1.username === user);
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    //check password
    const match = await bcrypt.compare(password, foundUser.password);
    if(match){
        // Create JWT while Auth
        const accessToken = jwt.sign(
            {"username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '15m'}
        );
        const otherUsers = usersDB.users.filter(user1 => user1.username != foundUser.username)
        const cuurentUser = {...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, cuurentUser])
        await fsPromises.writeFile(
            path.join(__dirname, "../model", 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 15 * 60 * 1000})
        res.json({ accessToken })
    }
    else{
        return res.sendStatus(401); // Unauthorized
    }
}

const handleNewUser = async (req, res) => {
    const { user, password,rpwd, email, phoneNumber} = req.body;
    if (!user || !password || !rpwd || !email || !phoneNumber) return res.status(400).json({ 'Message' : 'you must fill all the fields bellow'});
    if(password != rpwd)return res.status(400).json({ 'Message' : 'check your password'});
    //check for duplicate usernames
    const duplicate = usersDB.users.find(user1 => user1.username === user);
    if(duplicate) return res.sendStatus(409); //conflict
    try {
        //encrypt password
        const hashpwd = await bcrypt.hash(password, 10);

        //store new user
        const newUser = { "username" : user, "password" : hashpwd, "email": email, "phoneNumber": phoneNumber };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "../model", 'users.json'),
        JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({'success' : `New User ${user} created`})
    }
    catch(err){
        res.status(500).json({'Message' : err.Message })
    }
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(user1 => user1.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // Forbidden
    //check JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username != decoded.username) return res.sendStatus(403); // Invalid Token
            const accessToken = jwt.sign(
                {"username": foundUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({ accessToken });
        }
    )
}

module.exports = { handleNewUser, handleLogIn, handleRefreshToken};
