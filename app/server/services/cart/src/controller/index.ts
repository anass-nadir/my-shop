import { Request, Response } from 'express';
import { Cart } from '../models';

const getCart = async (req: Request, res: Response): Promise<Response> => {
  const cart = await Cart.find({ _userId: req.currentUser!.key });
  return res.status(200).json({ cart });
};
const updateCart = async (req: Request, res: Response): Promise<Response> => {
  const { products, total } = req.body;
  const cart = await Cart.refresh({
    _userId: req.currentUser?.key,
    total,
    products
  });
  return res.status(200).json(cart);
};
export { getCart, updateCart };
