const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product')

const ProductCategory = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  products: [{ type: mongoose.Schema.ObjectId, ref: Product }]
});

module.exports = mongoose.model('productCategory', ProductCategory);
