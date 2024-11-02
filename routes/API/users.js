const mongoose_api = require('../../models/moongose_api')
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const verifyJWT = require('../../middleware/verifyJWT');

router.post("/Basket/Add/:id", verifyJWT, async (req, res) => {
    const productID = req.params.id.replace(/"/g, '');
    const out = await mongoose_api.addToCurrentBasket(req.email, productID);
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.post("/Basket/Remove/:id", verifyJWT, async (req, res) => {
    const productID = req.params.id.replace(/"/g, '');
    const out = await mongoose_api.RemoveFromCurrentBasket(req.email, productID);
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/Allusers", async (req, res) => {
    const out = await mongoose_api.ReadData("users", {}, { _id: 0 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.post("/users", async (req, res) => {
    const out = await mongoose_api.CreateData("users", req.json)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.put("/users", async (req, res) => {
    var search = JSON.parse(`{"${req.body.fieldsearch}":"${req.body[req.body.fieldsearch]}"}`)
    delete req.body.fieldsearch
    const out = await mongoose_api.UpdateData("users", search, req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.delete("/users", async (req, res) => {
    const out = await mongoose_api.DeleteData("users", req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/users/MostBought", async (req, res) => {
    const out = await mongoose_api.ReadData("users", {}, { basketHistory: 1 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else {
        var product_count = []
        var product_name_count = {}
        data.forEach(element => {
            if (element.basketHistory.length > 0)
                element.basketHistory.forEach(basket => {
                    basket.forEach(product => {
                        product_count.forEach(product_c => {
                            if (Object.getOwnPropertyNames(product_c).includes(`${product}`))
                                product_c[`${product}`] = product_c[`${product}`] + 1
                        })
                        if (!product_count.find(product_c => { return Object.getOwnPropertyNames(product_c).includes(`${product}`) }))
                            product_count.push(JSON.parse(`{"${product}": 1}`))
                    });
                });
        });
        for (const product_c of product_count) {
            var key = Object.keys(product_c)
            var data = await mongoose_api.productModel.findById(`${key}`, "product_name")
            product_name_count[`${data.product_name}`] = product_c[key]
        }
        res.send(product_name_count)
    }
})

router.get("/users/ThatBoughtMost", async (req, res) => {
    mongoose_api.dbClient.model("users").aggregate([{ $project: { count: { $size: "$basketHistory" } } }])
        .then(async (users) => {
            var users_json = {}
            for (const user of users) {
                var data = await mongoose_api.userModel.findById(`${user._id}`, "email")
                users_json[`${data.email}`] = user.count
            }
            res.send(users_json)
        })
        .catch((err) => { console.log(err); res.status(500).json(err) })

})

module.exports = router;