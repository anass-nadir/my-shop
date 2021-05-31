import { IProductSchema } from 'IProduct';
import { Schema, Document, Model, model } from 'mongoose';
import { productStatics } from '../utils/schemasStatics';

export interface ProductDoc extends IProductSchema, Document {}

export interface ProductModel extends Model<ProductDoc> {
  build(attrs: IProductSchema): Promise<ProductDoc>;
}
enum productStates {
  'activated' = 1,
  'deactivated' = 0
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    price: {
      type: Number,
      required: true
    },
    imagesUrls: [String],
    quantity: {
      type: Number,
      validate: {
        validator: function (this: ProductDoc, value: number) {
          return !this.reserved || value >= this.reserved;
        },
        message: ({ value }) => `Insufficient ${value}!`
      },
      default: 0
    },
    reserved: {
      type: Number,
      validate: {
        validator: function (this: ProductDoc, value: number) {
          return value <= this.quantity;
        },
        message: ({ value }) => `Insufficient ${value}!`
      },
      default: 0
    },
    details: {
      type: []
    },
    state: {
      type: Number,
      default: 1,
      enum: Object.values(productStates)
    }
  },
  {
    timestamps: { currentTime: () => Date.now() },
    toJSON: {
      transform(doc, product) {
        delete product.__v;
      }
    }
  }
);
productSchema.statics = productStatics;

export const Product = model<ProductDoc, ProductModel>(
  'Product',
  productSchema
);
