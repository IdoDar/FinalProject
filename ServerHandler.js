//Express Module
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

main.get("/users",users_functions)
main.post("/users",users_functions)
main.put("/users",users_functions)
main.delete("/users",users_functions)

main.get("/suppliers",suppliers_functions)
main.post("/suppliers",suppliers_functions)
main.put("/suppliers",suppliers_functions)
main.delete("/suppliers",suppliers_functions)

main.get("/products",products_functions)
main.post("/products",products_functions)
main.put("/products",products_functions)
main.delete("/products",products_functions)

main.get("/baskethistory",baskethistory_functions)
main.post("/baskethistory",baskethistory_functions)
main.put("/baskethistory",baskethistory_functions)
main.delete("/baskethistory",baskethistory_functions)

main.get("/suppliers/locations",suppliers_functions)

main.get("/users/MostBought",users_functions)

main.get("/users/ThatBoughtMost",users_functions)

main.listen(80,function(){console.log("Main Running")})