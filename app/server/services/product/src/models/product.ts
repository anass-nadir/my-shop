import { Schema, Document, Model, model } from 'mongoose';

interface IProduct {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl: string;
  details?: [];
}
export interface ProductDoc extends IProduct, Document {}

interface ProductModel extends Model<ProductDoc> {
  build(attrs: IProduct): ProductDoc;
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
productSchema.statics.build = (attrs: IProduct) => {
  return new Product(attrs);
};
const Product = model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
