const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//fields in the collection
var userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    currentBasket: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"products"
    }],
    basketHistory: [[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"products"
    }]]
  });

  var productSchema = new Schema({
    product_name: {
    type: String,
    required: true
  },
  company_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"suppliers"
  },
  price: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture_link: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

var supplierSchema = new Schema({
    companyName: {
      type: String,
      required: true
    },
    numCompany: {
      type: Number,
      required: true,
      unique: true
    },
    contact: {
      type: String,
      required: true
    },
    phoneNum: {
      type: Number
    }
  });

  //export to use in diff .js
  exports.userSchema = userSchema;
  exports.productSchema = productSchema;
  exports.supplierSchema = supplierSchema;