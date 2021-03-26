const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, product) {
        delete product.__v;
      }
    }
  }
);

module.exports = mongoose.model('Product', Product);
