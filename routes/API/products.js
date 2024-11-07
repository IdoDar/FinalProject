const mongoose_api = require('../../controllers/moongose_api')
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    const out = await mongoose_api.ReadData("products", {}, { _id: 0 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.post("/", async (req, res) => {
    const out = await mongoose_api.CreateData("products", req.body)
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
    const out = await mongoose_api.UpdateData("products", search, req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.delete("/", async (req, res) => {
    const out = await mongoose_api.DeleteData("products", req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.post("/search", async (req, res) => {
    const out = await mongoose_api.ReadData("products", req.body, { ...{} })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/All", async (req, res) => {
    const out = await mongoose_api.ReadData("products", {}, {})
    var err = out[0]
    var data = out[1]
    console.log(data)
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/Fields", async (req, res) => {
    const out = await mongoose_api.GetProductsFields()
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/:Product", async (req, res) => {
    const productName = req.params.Product.replace(/"/g, '');
    const jsonreq = { _id: productName };

    const out = await mongoose_api.ReadData("products", jsonreq, { ...{ _id: 0, __v: 0 } })
    console.log(out);
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else {
        const companyname = await mongoose_api.ReadData("suppliers", { _id: data[0].company_name }, { ...{ _id: 0, companyName: 1 } })
        res.send({ data: data[0], "conpanyName": companyname[1][0].companyName });
    }
})
module.exports = router;

