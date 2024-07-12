const mongoose = require('mongoose')
const { Schema } = mongoose;

const billsSchema =  new Schema({ any: Schema.Types.Mixed }, { strict: false });
const Bills = mongoose.model('Bills', billsSchema);
module.exports= Bills