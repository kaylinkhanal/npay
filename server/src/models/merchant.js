const mongoose = require('mongoose')
const { Schema } = mongoose;

const merchantSchema = new Schema({
  merchantName: String, 
  merchantPhoneNumber: Number,
  merchantServiceCharge: Number,

});
const Merchant = mongoose.model('Merchant', merchantSchema);
module.exports= Merchant


