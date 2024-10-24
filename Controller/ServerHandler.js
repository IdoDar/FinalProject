//Express Module
const express = require('express')
const Schemas = require('../models/Schemas')

//body-parser Module
const bodyParser = require('body-parser')

//cors Module
const cors = require('cors')

var yourConnectionURI = "Manger:YARDEN1noam2IDO3@ourshop.ijtge.mongodb.net/?retryWrites=true&w=majority&appName=OurShop"
var dbName = "testing_tables"

//Init main http
const main = express()

//Init CRUD http
const crud = express()

//Connects to our mongo
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${yourConnectionURI}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

//which DB using
const dbClient = mongoose.connection.useDb(dbName)

//creates Schemas of a collection
if (!dbClient.models['users']) {
    var userModel = dbClient.model('users', Schemas.userSchema);
}
if (!dbClient.models['suppliers']) {
    var suppModel = dbClient.model('suppliers', Schemas.supplierSchema);
}
if (!dbClient.models['products']) {
    var productModel = dbClient.model('products', Schemas.productSchema);
}

//options to enable cros in browsers
var corsOptions = { origin: '*', methods: "GET,PUT,POST,DELETE" }

//Create New data in a collection from req
//var collection is the name of the collection
function CreateData(req, res, collection) {
    // Create a new user
    if (collection == "users") {
        const newCollection = new userModel(req.body);
        newCollection.save()
            .then(function () { console.log(`${collection} created: ${req.body}`); res.status(200).json(req.body) })
            .catch((err) => { console.log(err); res.status(404).json(err) });
    }
    if (collection == "suppliers") {
        const newCollection = new suppModel(req.body);
        newCollection.save()
            .then(function () { console.log(`${collection} created: ${req.body}`); res.status(200).json(req.body) })
            .catch((err) => { console.log(err); res.status(404).json(err) });
    }
    if (collection == "products") {
        const newCollection = new productModel(req.body);
        newCollection.save()
            .then(function () { console.log(`${collection} created: ${req.body}`); res.status(200).json(req.body) })
            .catch((err) => { console.log(err); res.status(404).json(err) });
    }
}

//Get all of data in a collection
//var collection is the name of the collection
//sends in jsons the data
function ReadData(req, res, collection) {
    console.log('Find users from', dbClient.name);
    dbClient.model(collection).find()
        .then(function (data) {
            res.send(data)
        })
        .catch((err) => { console.log(err); res.status(404).json(err) })

}

//Update data in a collection from req
//var collection is the name of the collection
//name of the field to search on the collection
function UpdateData(req, res, collection, field) {
    req_body = req.body
    fieldValue = req.body[field]
    var search = JSON.parse(`{"${field}": "${fieldValue}"}`)
    // Update a user
    dbClient.model(collection).findOneAndUpdate(search, req_body)
        .then(function () { console.log(`${collection} updated`); res.status(200).json(req.body) })
        .catch((err) => { console.log(err); res.status(404).json(req.body) });
}

//delete data in a collection from req
//var collection is the name of the collection
//name of the field to search on the collection
function DeleteData(req, res, collection, field) {
    req_body = req.body
    fieldValue = req.body[field]
    var search = JSON.parse(`{"${field}": "${fieldValue}"}`)
    // Delete a user
    dbClient.model(collection).deleteOne(search)
        .then(function () { console.log(`${collection} deleted`); res.status(200).json(req.body) })
        .catch((err) => { console.log(err); res.status(404).json(req.body) });
}

//make main use the "public" folder as it's gets and posts
main.use(express.static('public'))
main.use(cors(corsOptions))

//make crud parse data from postdata as "json",url and if postdata is as "text/plain"
crud.use(bodyParser.urlencoded({ extended: false }))
crud.use(bodyParser.json())
crud.use(bodyParser.text({ type: 'text/plain' }))
crud.use(cors(corsOptions))

//What happends when method GET (get all info) used to CRUD
crud.get("/", (req, res) => {
    ReadData(req, res, "users")
})

//What happends when method GET (get all info) used to CRUD
crud.get("/suppliers", (req, res) => {
    ReadData(req, res, "suppliers")
})
crud.post("/suppliers", (req, res) => {
    CreateData(req, res, "suppliers")
})
//What happends when method POST (to add more data) used to CRUD
crud.post("/", (req, res) => {
    CreateData(req, res, "users")
})

//What happends when method PUT (to update a row) used to CRUD
crud.put("/", (req, res) => {
    UpdateData(req, res, "users", "email")
})

//What happends when method delete (to delete data) used to CRUD
crud.delete("/", (req, res) => {
    DeleteData(req, res, "users", "email")
})

//make crud run on port 8080
crud.listen(8080, function () { console.log("CRUD Running") })

//make crud run on port 80
main.listen(80, function () { console.log("Main Running") })