import { Request, Response } from 'express';
import { BadRequestError } from '@anass-nadir/my-shop-common';
import { Product, Category, ProductCategory } from '../models';

const index = async (req: Request, res: Response): Promise<Response> => {
  const inventory = await ProductCategory.find()
    .populate('category')
    .populate({
      path: 'products',
      match: { quantity: { $gte: 0 }, state: 1 }
    });
  return res.status(200).json({ inventory });
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const {
    _categoryId,
    name,
    description,
    price,
    quantity,
    imagesUrls,
    reserved,
    details
  } = req.body;

  const product = await Product.build({
    name,
    description,
    price,
    quantity,
    imagesUrls,
    reserved,
    details
  });

  if (_categoryId) {
    const category = await Category.findById(_categoryId);
    if (category)
      await ProductCategory.attachProducts({
        category: category._id,
        products: product._id
      });
  }

  return res.status(201).json({
    product,
    message: 'Product added!'
  });
};

const attachWithCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { _categoryId, _productIds } = req.body;

  const category = await Category.findById(_categoryId);
  if (!category)
    throw new BadRequestError('Category not found please try adding it first!');

  const products = await Product.find({ _id: { $in: _productIds } }, '_id');

  if (!products.length) throw new BadRequestError('Products not found!');

  const { value } = await ProductCategory.attachProducts({
    category: category._id,
    products
  });

  return res.status(200).json({
    value,
    message: 'Done'
  });
};
const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { _id } = req.body;

  const product = await Product.findOneAndDelete({ _id });
  if (!product) throw new BadRequestError('Product not found');

  await ProductCategory.detachProduct(product._id);

  return res.status(200).json({
    product,
    message: 'Product deleted!'
  });
};

export { index, create, destroy, attachWithCategory };
