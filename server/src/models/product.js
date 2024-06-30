const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: String, // String is shorthand for {type: String}
  productPrice: Number,
  productCategory: String,
  productDescription: String,
  productImage: String,
  cartQuantity: {type: Number, default:0}

});
const Product = mongoose.model('Product', productSchema);
module.exports= Product


