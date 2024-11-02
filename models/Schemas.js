const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//fields in the collection
var userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    roles: {
        User: {
          type: Number,
          default: 100
        },
        Admin: {
           type: Number
        }
      },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phoneNum: {
      type: Number,
      required: true
    },
    dateBirth:{
      type: Date,
      required: true
  },
    password: {
      type: String,
      required: true
    },
    refreshToken: {
        type: String
    },
    currentBasket: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"products"
    }]
  });

  var productSchema = new Schema({
    product_name: {
    type: String,
    required: true,
    unique: true
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
      type:Number,
      required: true,
      unique: true
    },
    contact: {
      type: String,
      required: true
    },
    phoneNum: {
      type: Number,
      required: true
    },
    locations: {
        type: Array
      }
  });
var basketHistorySchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    date:{
        type: Date,
        default: Date.now()
    },
    basket: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"products"
    }]
  });

  //export to use in diff .js
  exports.userSchema = userSchema;
  exports.productSchema = productSchema;
  exports.supplierSchema = supplierSchema;
  exports.basketHistorySchema = basketHistorySchema;