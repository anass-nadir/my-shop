const Cart = require('../models');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user });

    return res
      .status(200)
      .json({ success: true, data: { cart: cart[0] || cart } });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
const updateCart = async (req, res) => {
  try {
    const cartItems = req.body.items;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user },
      { items: cartItems },
      {
        new: true,
        upsert: true,
        rawResult: true
      }
    );
    return res.status(200).json({ success: true, data: cart });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
module.exports = {
  getCart,
  updateCart
};
