import { Request, Response } from 'express';
import { Cart } from '../models';

const getCart = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cart = await Cart.find({ userId: req.currentUser!._id });

    return res
      .status(200)
      .json({ success: true, data: { cart: cart[0] || cart } });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
const updateCart = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cartItems = req.body.items;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.currentUser!._id },
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
export { getCart, updateCart };
