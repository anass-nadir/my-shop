const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'productCategory'
  }
});

module.exports = mongoose.model('product', Product);
