import { Schema, Document, Model, model } from 'mongoose';

interface ICart {
  items: string;
  userId: Document['_id'];
}

interface CartDoc extends ICart, Document {}

interface CartModel extends Model<CartDoc> {
  build(attrs: ICart): CartDoc;
  sync(attrs: ICart): Promise<CartDoc>;
}

const cartSchema = new Schema(
  {
    items: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    toJSON: {
      transform(doc, cart) {
        delete cart.__v;
      }
    }
  }
);
cartSchema.statics.build = (attrs: CartDoc) => {
  return new Cart(attrs);
};
cartSchema.statics.sync = async (attrs: ICart) => {
  return await Cart.findOneAndUpdate(
    { userId: attrs.userId },
    { items: attrs.items },
    {
      new: true,
      upsert: true,
      rawResult: true
    }
  );
};
const Cart = model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };
