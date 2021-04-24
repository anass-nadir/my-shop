import { Request, Response } from 'express';
import { BadRequestError } from '@anass-nadir/my-shop-common';
import { Cart } from '../models';

const getCart = async (req: Request, res: Response): Promise<Response> => {
  const cart = await Cart.find({ userId: req.currentUser!._id });
  if (typeof cart !== 'object') throw new BadRequestError('Cart not found');
  return res
    .status(200)
    .json({ success: true, data: { cart: cart[0] || cart } });
};
const updateCart = async (req: Request, res: Response): Promise<Response> => {
  const cartItems = req.body.items;
  const cart = await Cart.sync({
    userId: req.currentUser?._id,
    items: cartItems
  });
  return res.status(200).json({ success: true, data: cart });
};
export { getCart, updateCart };
