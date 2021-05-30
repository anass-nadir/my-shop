import { Model } from 'mongoose';
import {
  ProductCategoryDoc,
  ProductCategoryModel,
  ProductModel,
  ProductDoc,
  CategoryDoc,
  CategoryModel
} from '../models';

export const productCategoryStatics: {
  [name: string]: (
    this: Model<ProductCategoryDoc, ProductCategoryModel>,
    ...args: any[]
  ) => any;
} = {
  build: function (this, attrs) {
    return this.create(attrs);
  },
  attachProducts: function (this, { category, products }) {
    return this.findOneAndUpdate(
      { category },
      { $addToSet: { products } },
      {
        new: true,
        upsert: true,
        rawResult: true
      }
    ).exec();
  },
  detachProduct: function (this, productId) {
    return this.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    ).exec();
  }
};
export const productStatics: {
  [name: string]: (
    this: Model<ProductDoc, ProductModel>,
    ...args: any[]
  ) => any;
} = {
  build: function (this, attrs) {
    return this.create(attrs);
  }
};
export const categoryStatics: {
  [name: string]: (
    this: Model<CategoryDoc, CategoryModel>,
    ...args: any[]
  ) => any;
} = {
  build: function (this, attrs) {
    return this.create(attrs);
  }
};
