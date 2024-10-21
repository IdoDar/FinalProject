const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const Products_Schema = new Schema({
    product_name: String,
    company_name: String,
    price: Number,
    weight: Number,
    Description: String,
    Category: String
  });

  module.exports = mongoose.model("products", Products_Schema);
