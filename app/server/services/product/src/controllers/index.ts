import { Request, Response } from 'express';
import { ProductCategory } from '../models/productCategory';

const getProductsWithCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await ProductCategory.find().populate('products');

    return res.status(200).json({ success: true, data: { products } });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await ProductCategory.find({}, 'title imageUrl');
    return res.status(200).json({ success: true, data: { categories } });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
export { getProductsWithCategories, getCategories };
