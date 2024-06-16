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
    enum : ['unverified','pending','verified'],
    default: 'user'
  },
  userId: String
});
const UserKyc = mongoose.model('UserKyc', userKycSchema);
module.exports= UserKyc


