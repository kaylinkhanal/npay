const mongoose = require('mongoose')
const { Schema } = mongoose;

const merchantSchema = new Schema({
  merchantName: String, 
  merchantPhoneNumber: Number,
  merchantServiceCharge: Number,
  merchantFields: Array,
  merchantBalance:  {type: Number, default:0},
});
const Merchant = mongoose.model('Merchant', merchantSchema);
module.exports= Merchant


