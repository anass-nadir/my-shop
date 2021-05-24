import { ICartSchema } from 'ICart';
import { Schema, Document, Model, model } from 'mongoose';

import type { FindAndModifyWriteOpResultObject } from 'mongodb';

interface CartDoc extends ICartSchema, Document {}

interface CartModel extends Model<CartDoc> {
  build(attrs: ICartSchema): CartDoc;
  refresh(
    attrs: ICartSchema
  ): Promise<FindAndModifyWriteOpResultObject<CartDoc>>;
}

const cartSchema = new Schema(
  {
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          index: true,
          required: true
        },
        name: String,
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        details: {
          type: []
        },
        imagesUrls: [String],
        createdAt: { type: Date, default: Date.now() }
      }
    ],
    _userId: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: { currentTime: () => Date.now() },
    toJSON: {
      transform(doc, cart) {
        delete cart._id;
        delete cart.__v;
      }
    }
  }
);

cartSchema.statics.build = attrs => new Cart(attrs);

cartSchema.statics.refresh = ({ _userId, products, total }) =>
  Cart.findOneAndUpdate(
    {
      _userId
    },
    { $set: { products, total } },
    {
      new: true,
      upsert: true,
      rawResult: true
    }
  );

export const Cart = model<CartDoc, CartModel>('Cart', cartSchema);
