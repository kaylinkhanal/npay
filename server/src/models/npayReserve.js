const mongoose = require('mongoose')
const { Schema } = mongoose;

const npayReserveSchema = new Schema({
  npayBalance: {type:Number, default: 0},
  npayServiceCharge: {type: Number, default: 10}
},
{
  timestamps: true
});
const NPayReserve = mongoose.model('NPayReserve', npayReserveSchema);
// NPayReserve.pre('save', function(next) { 
//   if(this.isModified('npayServiceCharge')) {
//     throw 'someField is read only!'
//   }
//   else {
//     next();
//   }
// });
module.exports= NPayReserve