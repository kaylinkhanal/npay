const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  phoneNumber: String, // String is shorthand for {type: String}
  fullName: String,
  email: String,
  password: String,
  gender: {
    type: String,
    enum : ['male','female','other'],
    default: 'female'
  },
  role: {
    type: String,
    enum : ['admin','user','merchant'],
    default: 'user'
  },
});
const User = mongoose.model('User', userSchema);
module.exports= User