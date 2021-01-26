const Cart = require('../models/cart');

const getCart = (req, res) => {
  try {
    Cart.find({ userId: req.user }).exec((err, cart) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      if (!cart) {
        return res
          .status(400)
          .json({ success: false, error: "there's no cart" });
      }
      return res
        .status(200)
        .json({ success: true, data: { cart: cart[0] || cart } });
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
const updateCart = (req, res) => {
  try {
    const cartItems = req.body.items;
    if (!cartItems) {
      return res
        .status(400)
        .json({ success: false, error: 'send me some items to add' });
    }
    Cart.findOneAndUpdate(
      { userId: req.user },
      { items: cartItems },
      {
        new: true,
        upsert: true,
        rawResult: true
      },
      (err, cart) => {
        if (err) {
          return res.status(400).json({ success: false, error: err.message });
        }
        if (!cart) {
          return res
            .status(400)
            .json({ success: false, error: "there's no cart" });
        }
        return res.status(200).json({ success: true, data: { cart } });
      }
    );
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
module.exports = {
  getCart,
  updateCart
};
