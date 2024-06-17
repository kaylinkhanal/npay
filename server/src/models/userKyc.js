const mongoose = require('mongoose')
const { Schema } = mongoose;

const userKycSchema = new Schema({
  citizenshipPhoto: String,
  fathersName: String,
  permanentAddress: String,
  dateOfBirth: String,
  panNumber: Number,
  temporaryAddress: String,
  kycVerifiedStatus: {
    type: String,
    enum : ['unVerified','pending','verified'],
    default: 'unVerified'
  },
  userId: String
},{
  timestamps:true
});
const UserKyc = mongoose.model('UserKyc', userKycSchema);
module.exports= UserKyc


