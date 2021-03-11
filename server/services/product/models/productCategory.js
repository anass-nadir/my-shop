const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCategory = new Schema(
  {
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
    products: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }]
  },
  {
    toJSON: {
      transform(doc, product) {
        delete product.__v;
      }
    }
  }
);

module.exports = mongoose.model('ProductCategory', ProductCategory);
