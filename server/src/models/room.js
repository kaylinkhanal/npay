const mongoose = require('mongoose')
const { Schema } = mongoose;

const roomSchema = new Schema({
  roomNumber: String, 
  isBooked: Boolean,
  price: Number,
  bookedDuration: {startDate: {type:String},  endDate:{type: String} },
  roomCategory: String,
  roomPhoto: String,
  discount: Number
});
const Room = mongoose.model('Room', roomSchema);
module.exports= Room


