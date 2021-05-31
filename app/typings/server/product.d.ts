declare module 'IProduct' {
  interface IProductSchema {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    reserved?: number;
    imagesUrls?: string[];
    state?: boolean;
    details?: [];
  }
  interface IProductPayload extends IProductSchema {
    _id?: ObjectId;
  }
  interface IProductTestPayload extends Partial<IProductSchema> {
    _id?: ObjectId;
    _productIds?: ObjectId[];
    _categoryId?: ObjectId;
  }
  interface ICategorySchema {
    title: string;
    slug: string;
    imagesUrls?: string[];
  }
  interface ICategoryPayload extends ICategorySchema {
    _id?: ObjectId;
  }
  interface IProductCategorySchema {
    category: ObjectId;
    products?: ObjectId[];
  }
  interface IProductCategoryAttachPayload extends IProductCategorySchema {
    _id?: ObjectId;
    products: ObjectId[] | ObjectId;
  }
}
