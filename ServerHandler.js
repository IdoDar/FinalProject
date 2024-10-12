//Express Module
const express = require('express')

//Init app http
const app=express()

//make main use the "public" folder as it's gets and posts
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")

const authRouter = require("./routes/auth")
app.use("/auth", authRouter)

app.listen(8080)




