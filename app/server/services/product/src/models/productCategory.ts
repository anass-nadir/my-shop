import type {
  IProductCategoryAttachPayload,
  IProductCategorySchema
} from 'IProduct';
import {
  Schema,
  Document,
  Model,
  model,
  ObjectId,
  UpdateWriteOpResult
} from 'mongoose';
import type { FindAndModifyWriteOpResultObject } from 'mongodb';

import { productCategoryStatics } from '../utils/schemasStatics';

export interface ProductCategoryDoc extends IProductCategorySchema, Document {}

export interface ProductCategoryModel extends Model<ProductCategoryDoc> {
  build(attrs: IProductCategorySchema): Promise<ProductCategoryDoc>;
  attachProducts(
    attrs: IProductCategoryAttachPayload
  ): Promise<FindAndModifyWriteOpResultObject<ProductCategoryDoc>>;
  detachProduct(id: ObjectId): Promise<UpdateWriteOpResult>;
}

const productCategorySchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  },
  {
    toJSON: {
      transform(doc, product) {
        delete product._id;
        delete product.__v;
      }
    }
  }
);
productCategorySchema.statics = productCategoryStatics;

export const ProductCategory = model<ProductCategoryDoc, ProductCategoryModel>(
  'ProductCategory',
  productCategorySchema
);
