const mongoose_api = require('../../controllers/moongose_api')
const express = require("express");
const verifyJWT = require('../../middleware/verifyJWT');
const router = express.Router();

router.get("/", async (req, res) => {
    const out = await mongoose_api.ReadData("baskethistory", {}, { _id: 0 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.post("/", async (req, res) => {
    const out = await mongoose_api.CreateData("baskethistory", req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.put("/", async (req, res) => {
    var search = JSON.parse(`{"${req.body.fieldsearch}":"${req.body[req.body.fieldsearch]}"}`)
    delete req.body.fieldsearch
    const out = await mongoose_api.UpdateData("baskethistory", search, req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.delete("/", async (req, res) => {
    const out = await mongoose_api.DeleteData("baskethistory", req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/history/:baskethistory", async (req, res) => {
    const user = req.params.baskethistory.replace(/"/g, '');
    const id = await mongoose_api.dbClient.model("users").find({ email: user }, {})
    const products = await mongoose_api.dbClient.model("baskethistory").find({ user: id[0]._id })
    var data = []
    for (const product of products) {
        var product_names = []
        for (const basket of product.basket) {
            var product_detailes = await mongoose_api.productModel.findById(`${basket}`, "product_name price")
            product_names.push({product_name:product_detailes.product_name,price:product_detailes.price})
        }
        data.push({ date: product.date, product_names: product_names })

    }
    res.send(data)
})

router.post("/MyBasket/Add/:id", verifyJWT, async (req, res) => {
    const productID = req.params.id.replace(/"/g, '');
    console.log("try" + productID);
    console.log(productID);
    const out = await mongoose_api.addToCurrentBasket(req.email, productID);
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.post("/MyBasket/Remove/:id", verifyJWT, async (req, res) => {
    const productID = req.params.id.replace(/"/g, '');
    console.log("try" + productID);
    const out = await mongoose_api.RemoveFromCurrentBasket(req.email, productID);
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
module.exports = router;

