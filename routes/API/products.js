const mongoose_api = require('../../models/moongose_api')
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')

router.get("/ProductsFields", async (req, res) => {
    const out = await mongoose_api.GetProductsFields()
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/products", async (req, res) => {
    if (req.body.length != 2) res.sendStatus(400);
    else {
        const out = await mongoose_api.ReadData("products", req.body[0], { ...{ _id: 0 }, ...req.body[1] })
        var err = out[0]
        var data = out[1]
    }
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/Allproducts", async (req, res) => {
    const out = await mongoose_api.ReadData("products", {}, { _id: 0 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.post("/products", async (req, res) => {
    const out = await mongoose_api.CreateData("products", req.json)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.put("/products", async (req, res) => {
    var search = JSON.parse(`{"${req.body.fieldsearch}":"${req.body[req.body.fieldsearch]}"}`)
    delete req.body.fieldsearch
    const out = await mongoose_api.UpdateData("products", search, req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.delete("/products", async (req, res) => {
    const out = await mongoose_api.DeleteData("products", req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

module.exports = router;
