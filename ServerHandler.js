//Express Module
require('dotenv').config();
const express = require('express')

const mongoose_api = require('./models/mongoose_api')
const users_functions = require('./routes/users_functions')
const suppliers_functions = require('./routes/suppliers_functions')
const products_functions = require('./routes/products_functions')
const baskethistory_functions = require('./routes/baskethistory_functions')

//body-parser Module
const bodyParser=require('body-parser')

//Init main http
const main=express()

//make main use the "public" folder as it's gets and posts
main.use(express.static('public'))

main.use(bodyParser.urlencoded({ extended: false }))
main.use(bodyParser.json())
main.use(bodyParser.text({ type: 'text/plain' }))

main.use("/users",users_functions)


main.use("/suppliers",suppliers_functions)

main.use("/products",products_functions)

main.use("/baskethistory",baskethistory_functions)

main.listen(80,function(){console.log("Main Running")})