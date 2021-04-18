import { Schema, Document, Model, model, Types } from 'mongoose';

interface IProductCategory {
  category: Types.ObjectId;
  products: [Types.ObjectId];
}
interface ProductCategoryDoc extends IProductCategory, Document {}

interface ProductCategoryModel extends Model<ProductCategoryDoc> {
  build(attrs: IProductCategory): ProductCategoryDoc;
  pushProduct(attrs: IProductCategory): Promise<ProductCategoryDoc>;
}

const productCategorySchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  },
  {
    toJSON: {
      transform(doc, product) {
        delete product._id;
        delete product.__v;
      }
    }
  }
);
productCategorySchema.statics.build = (attrs: IProductCategory) => {
  return new ProductCategory(attrs);
};
productCategorySchema.statics.pushProduct = async attrs => {
  return await ProductCategory.findOneAndUpdate(
    { category: attrs.category },
    { $push: { products: attrs.products } },
    {
      new: true,
      upsert: true,
      rawResult: true
    }
  );
};

const ProductCategory = model<ProductCategoryDoc, ProductCategoryModel>(
  'ProductCategory',
  productCategorySchema
);

export { ProductCategory };
