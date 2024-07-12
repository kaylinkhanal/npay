const mongoose = require('mongoose')
const { Schema } = mongoose;

const noticeSchema = new Schema({
  content: String, 
});
const Notice = mongoose.model('Notice', noticeSchema);
module.exports= Notice


