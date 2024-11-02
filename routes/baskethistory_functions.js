const mongoose_api = require('../models/mongoose_api')
const express = require("express");
const router = express.Router();
const bodyParser=require('body-parser')

router.get("/",async (req,res) => {
    const out= await mongoose_api.ReadData("baskethistory",{},{_id: 0})
    var err=out[0]
    var data=out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.get("/:baskethistory",async (req,res) => {
    const user = req.params.baskethistory.replace(/"/g, '');
    const id = await mongoose_api.dbClient.model("users").find({email:user}, {})
    const products = await mongoose_api.dbClient.model("baskethistory").find({user:id[0]._id })
    var data=[]
    for (const product of products) {
        var product_names = []
        for (const basket of product.basket){
            var product_detailes=await mongoose_api.productModel.findById(`${basket}`,"product_name")
            product_names.push(product_detailes.product_name)
        }
        data.push({date:product.date,product_names:product_names})
        
    }
    res.send(data)
})
router.post("/",async (req,res) =>{
    const  out= await mongoose_api.CreateData("baskethistory",req.body)
    var err=out[0]
    var data=out[1]
    if (err)
        res.status(500).json(err)
    else
        res.send(data)
})
router.put("/",async (req,res) =>
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
router.delete("/",async (req,res) =>
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

