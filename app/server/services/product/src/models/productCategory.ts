import { Schema, Document, Model, model } from 'mongoose';
import { ProductDoc } from './product';

interface ProductCategoryDoc extends Document {
  title: string;
  products: [ProductDoc['_id']];
  imageUrl: string;
}

interface ProductCategoryModel extends Model<ProductCategoryDoc> {
  build(attrs: ProductCategoryDoc): ProductCategoryDoc;
}

const ProductCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  },
  {
    toJSON: {
      transform(doc, product) {
        delete product.__v;
      }
    }
  }
);

const ProductCategory = model<ProductCategoryDoc, ProductCategoryModel>(
  'ProductCategory',
  ProductCategorySchema
);
ProductCategorySchema.statics.build = (attrs: ProductDoc) => {
  return new ProductCategory(attrs);
};
export { ProductCategory };
