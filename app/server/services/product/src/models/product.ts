import { IProductSchema } from 'IProduct';
import { Schema, Document, Model, model } from 'mongoose';

export interface ProductDoc extends IProductSchema, Document {}

interface ProductModel extends Model<ProductDoc> {
  build(attrs: IProductSchema): ProductDoc;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    details: {
      type: []
    }
  },
  {
    toJSON: {
      transform(doc, product) {
        delete product.__v;
      }
    }
  }
);
productSchema.statics.build = attrs => {
  return new Product(attrs);
};
const Product = model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
