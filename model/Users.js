const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//fields in the collection
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  roles: {
    User: {
      type: Number,
      default: 100
    },
    Supplier: Number,
    Admin: Number
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: String,
  currentBasket: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  }],
  basketHistory: [[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  }]]
});

//export to use in diff .js
module.exports = mongoose.model('Users', userSchema);