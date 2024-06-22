const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: String, // String is shorthand for {type: String}
  productPrice: Number,
  productCategory: String,
  productDescription: String,
  productImage: String

});
const Product = mongoose.model('Product', productSchema);
module.exports= Product


