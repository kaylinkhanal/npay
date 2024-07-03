const mongoose = require('mongoose')
const { Schema } = mongoose;

const npayReserveSchema = new Schema({
  npayBalance: {type:Number, default: 0 },
  npayServiceCharge:{type:Number,default: 10 },
},
{
  timestamps: true
});
const Transactions = mongoose.model('NPayReserve', npayReserveSchema);
module.exports= Transactions