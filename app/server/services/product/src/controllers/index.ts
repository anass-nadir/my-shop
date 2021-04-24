import { Request, Response } from 'express';
import { NotFoundError } from '@anass-nadir/my-shop-common';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { ProductCategory } from '../models/productCategory';

const getInventory = async (req: Request, res: Response): Promise<Response> => {
  const inventory = await ProductCategory.find()
    .populate('category')
    .populate('products');
  return res.status(200).json({ success: true, data: { inventory } });
};
const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await Category.find({}, 'title slug imageUrl');
  return res.status(200).json({ success: true, data: { categories } });
};
const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    categoryId,
    name,
    description,
    price,
    quantity,
    imageUrl,
    details
  } = req.body;

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new NotFoundError('Category not found please try adding it first!');
  }
  const product = Product.build({
    name,
    description,
    price,
    quantity,
    imageUrl,
    details
  });

  await product.save();

  const productCategory = await ProductCategory.pushProduct({
    category: category._id,
    products: [product._id]
  });

  return res.status(201).json({
    success: true,
    productCategory,
    message: 'Product added!'
  });
};
const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, imageUrl, slug } = req.body;

  const category = Category.build({
    title,
    slug,
    imageUrl
  });

  await category.save();

  return res.status(201).json({
    success: true,
    category,
    message: 'category added!'
  });
};
export { getInventory, getCategories, createProduct, createCategory };
