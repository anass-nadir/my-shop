import { Schema, Document, Model, model } from 'mongoose';

interface CartDoc extends Document {
  items: string;
  userId: Document['_id'];
}

interface CartModel extends Model<CartDoc> {
  build(attrs: CartDoc): CartDoc;
}

const cartSchema = new Schema({
  items: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});
cartSchema.statics.build = (attrs: CartDoc) => {
  return new Cart(attrs);
};
const Cart = model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };
