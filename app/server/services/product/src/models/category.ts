import { ICategorySchema } from 'IProduct';
import { Schema, Document, Model, model } from 'mongoose';
import { categoryStatics } from '../utils/schemasStatics';

export interface CategoryDoc extends ICategorySchema, Document {}

export interface CategoryModel extends Model<CategoryDoc> {
  build(attrs: ICategorySchema): Promise<CategoryDoc>;
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
    imagesUrls: [String]
  },
  {
    toJSON: {
      transform(doc, product) {
        delete product.__v;
      }
    }
  }
);

categorySchema.statics = categoryStatics;

export const Category = model<CategoryDoc, CategoryModel>(
  'Category',
  categorySchema
);
