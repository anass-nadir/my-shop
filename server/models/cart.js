const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
  items: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
});

module.exports = mongoose.model('cart', Cart);
