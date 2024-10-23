const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data }
}

const bcrypt = require('bcrypt');

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogIn = async (req, res) => {
    const { user, password} = req.body;
    if (!user || !password ) return res.status(400).json({ 'Message' : 'Username & Password are required'});
    const foundUser = usersDB.users.find(user1 => user1.username === user);
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    //check password
    const match = await bcrypt.compare(password, foundUser.password);
    if(match){
        // Later: create here JWT 
        res.json({'success': `User ${user} is logged in)`})
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

module.exports = { handleNewUser, handleLogIn };
