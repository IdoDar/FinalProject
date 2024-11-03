const mongoose_api = require('../../controllers/moongose_api')
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')


router.get("/", async (req, res) => {
    const out = await mongoose_api.ReadData("suppliers", {}, { _id: 0 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.post("/", async (req, res) => {
    const out = await mongoose_api.CreateData("suppliers", req.body)
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
    const out = await mongoose_api.UpdateData("suppliers", search, req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.delete("/", async (req, res) => {
    const out = await mongoose_api.DeleteData("suppliers", req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/locations", async (req, res) => {
    const out = await mongoose_api.ReadData("suppliers", {}, { companyName: 1, locations: 1, _id: 0 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/:suppliernum", async (req, res) => {
    const suppliernum = req.params.suppliernum.replace(/"/g, '')
    const out = await mongoose_api.ReadData("suppliers", { numCompany: suppliernum }, { _id: 1 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/All", async (req, res) => {
    const out = await mongoose_api.ReadData("suppliers", {}, {})
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

module.exports = router;

