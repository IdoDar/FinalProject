//Import Modules
require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger');
const cookieParser = require('cookie-parser');
const ROLES_LIST = require('./config/roles_list');
const verifyRoles = require('./middleware/verifyRoles');
const verifyJWT = require('./middleware/verifyJWT');
const mongoose = require('mongoose');
const connectDB = require('./config/dbconn')
const PORT = process.env.PORT || 8080;

//connect the DB
connectDB();

//Init app http
const app = express();

//make main use the "public" folder as it's gets and posts
app.use(express.static('public'));

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
//routes
app.use("/auth", require("./routes/auth"));

app.use("/supplier", verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.supplier), require("./routes/supplier"));

app.use("/admin", verifyJWT, verifyRoles(ROLES_LIST.Admin), require("./routes/admin"));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running `));
});



