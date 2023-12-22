const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  metal: String,
  type: String,
  description: String,
  collections: String,
  image: String,
});
// const Product = mongoose.model("Product", productSchema);
const Product = mongoose.model("Product", productSchema, "Product");

module.exports = Product;
