const mongoose_api = require('../models/mongoose_api')
const express = require("express");
const router = express.Router();
const bodyParser=require('body-parser')

router.get("/baskethistory",async (req,res) => {
    const out= await mongoose_api.ReadData("baskethistory",{},{_id: 0})
    var err=out[0]
    var data=out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.post("/baskethistory",async (req,res) =>{
    const  out= await mongoose_api.CreateData("baskethistory",req.json)
    var err=out[0]
    var data=out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.put("/baskethistory",async (req,res) =>
{
    var search=JSON.parse(`{"${req.body.fieldsearch}":"${req.body[req.body.fieldsearch]}"}`)
    delete req.body.fieldsearch
    const out= await mongoose_api.UpdateData("baskethistory",search,req.body)
    var err=out[0]
    var data=out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.delete("/baskethistory",async (req,res) =>
{
    const out= await mongoose_api.DeleteData("baskethistory",req.body)
    var err=out[0]
    var data=out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})

module.exports  = router;

