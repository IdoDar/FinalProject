const mongoose_api = require('../../controllers/moongose_api')
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const verifyJWT = require('../../middleware/verifyJWT');

router.get("/", async (req, res) => {
    const out = await mongoose_api.ReadData("users", {}, { _id: 0 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.post("/", async (req, res) => {
    const out = await mongoose_api.CreateData("users", req.json)
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
    const out = await mongoose_api.UpdateData("users", search, req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.delete("/", async (req, res) => {
    const out = await mongoose_api.DeleteData("users", req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})



router.get("/MostBought", async (req, res) => {
    const out = await mongoose_api.ReadData("baskethistory", {}, { basket: 1 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else {
        var product_count = []
        var product_name_count = {}
        data.forEach(element => {
            console.log(element)
            if (element.basket.length > 0)
                element.basket.forEach(product => {
                    product_count.forEach(product_c => {
                        if (Object.getOwnPropertyNames(product_c).includes(`${product}`))
                            product_c[`${product}`] = product_c[`${product}`] + 1
                    })
                    if (!product_count.find(product_c => { return Object.getOwnPropertyNames(product_c).includes(`${product}`) }))
                        product_count.push(JSON.parse(`{"${product}": 1}`))
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


router.get("/ThatBoughtMost", async (req, res) => {
    mongoose_api.dbClient.model("baskethistory").aggregate([{ $project: { user: 1, count: { $size: "$basket" } } }])
        .then(async (baskets) => {
            console.log(baskets)
            var users_json = {}
            for (const basket of baskets) {
                var data = await mongoose_api.userModel.findById(`${basket.user}`, "email")
                users_json[`${data.email}`] = basket.count
            }
            res.send(users_json)
        })
        .catch((err) => { console.log(err); res.status(500).json(err) })

})

router.get("/All", async (req, res) => {
    const out = await mongoose_api.ReadData("users", {}, { _id: 0 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/:user", async (req, res) => {
    const user = req.params.user.replace(/"/g, '');
    //console.log(user);
    const id = await mongoose_api.dbClient.model("users").find({ email: user }, {});
    //console.log(id);
    //const products = await mongoose_api.dbClient.model("baskethistory").find({user:id[0]._id })
    var data = []
    /*for (const product of products) {
        var product_names = []
        for (const basket of product.basket){
            var product_detailes=await mongoose_api.productModel.findById(`${basket}`,"product_name")
            product_names.push(product_detailes.product_name)
        }
        data.push({date:product.date,product_names:product_names})
        
    }*/
    res.send(id)
})

module.exports = router;