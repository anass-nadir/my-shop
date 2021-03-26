import { Schema, Document, Model, model } from 'mongoose';

export interface ProductDoc extends Document {
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductModel extends Model<ProductDoc> {
  build(attrs: ProductDoc): ProductDoc;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
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

const Product = model<ProductDoc, ProductModel>('Product', productSchema);
productSchema.statics.build = (attrs: ProductDoc) => {
  return new Product(attrs);
};
export { Product };
