import { Schema, Document, Model, model, Types } from 'mongoose';

interface ICategory {
  title: string;
  slug: string;
  imageUrl: string;
}

export interface CategoryDoc extends ICategory, Document {}

interface CategoryModel extends Model<CategoryDoc> {
  build(attrs: ICategory): CategoryDoc;
}

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
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
categorySchema.statics.build = (attrs: ICategory) => {
  return new Category(attrs);
};
const Category = model<CategoryDoc, CategoryModel>('Category', categorySchema);

export { Category };
