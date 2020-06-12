const Cart = require('../models/cart');

const getCart = async (req, res) => {
  await Cart.find({ userId: req.user._id }).exec((err, cart) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!cart) {
      return res.status(400).json({ success: false, error: "there's no cart" });
    }
    return res
      .status(200)
      .json({ success: true, data: { cart: cart[0] || cart } });
  });
};
const updateCart = async (req, res) => {
  const cartItems = req.body.items;
  if (!cartItems) {
    return res
      .status(400)
      .json({ success: false, error: 'send me some items to add' });
  }
  await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { items: cartItems },
    {
      new: true,
      upsert: true,
      rawResult: true
    },
    (err, cart) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!cart) {
        return res
          .status(400)
          .json({ success: false, error: "there's no cart" });
      }
      return res.status(200).json({ success: true, data: { cart } });
    }
  );
};
module.exports = {
  getCart,
  updateCart
};
