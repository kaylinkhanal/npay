const mongoose = require('mongoose');

const dbConnect = async()=>{
   const connection= await mongoose.connect('mongodb://127.0.0.1:27017/npay');
   if(connection) console.log("connected to mongodb")
}


module.exports = dbConnect
