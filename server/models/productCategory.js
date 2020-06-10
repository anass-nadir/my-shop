const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productCategory = new Schema({
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
  products: [{ type: mongoose.Schema.ObjectId, ref: 'product' }]
});

module.exports = mongoose.model('productCategory', productCategory);
