import { Request, Response } from 'express';
import { BadRequestError } from '@anass-nadir/my-shop-common';
import { Category, ProductCategory } from '../models';

const index = async (req: Request, res: Response): Promise<Response> => {
  const categories = await Category.find({}, 'title slug imagesUrls');
  return res.status(200).json({ categories });
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const { title, imagesUrls, slug } = req.body;

  const category = await Category.build({
    title,
    slug,
    imagesUrls
  });

  return res.status(201).json({
    category,
    message: 'Category added!'
  });
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { _id } = req.body;
  const category = await Category.findOneAndDelete({ _id });
  if (!category) throw new BadRequestError('Category not found');
  await ProductCategory.deleteOne({ category: category._id });
  return res.status(200).json({
    category,
    message: 'Category deleted!'
  });
};
export { index, create, destroy };
