//Express Module
const express = require('express');
const logger = require('./middleware/logger');
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 8080;
//Init app http
const app=express();

//make main use the "public" folder as it's gets and posts
app.use(express.static('public'));

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
//routes
app.use("/auth", require("./routes/auth"));

app.listen(PORT, ()=> console.log('Server Running'));




