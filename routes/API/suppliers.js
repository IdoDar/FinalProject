const mongoose_api = require('../../models/moongose_api')
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')

router.get("/Allsuppliers", async (req, res) => {
    const out = await mongoose_api.ReadData("suppliers", {}, {})
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.post("/suppliers", async (req, res) => {
    const out = await mongoose_api.CreateData("suppliers", req.json)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.put("/suppliers", async (req, res) => {
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
router.delete("/suppliers", async (req, res) => {
    const out = await mongoose_api.DeleteData("suppliers", req.body)
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

router.get("/suppliers/locations", async (req, res) => {
    const out = await mongoose_api.ReadData("suppliers", {}, { locations: 1, _id: 0 })
    var err = out[0]
    var data = out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

module.exports = router;

