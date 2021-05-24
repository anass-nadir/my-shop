declare module 'ICart' {
  import type { IProductPayload } from 'IProduct';
  import type { ObjectId } from 'mongoose';
  interface ICartSchema {
    products?: IProductPayload[];
    _userId?: ObjectId | string;
    total: number;
  }
  interface ICartPayload extends ICartSchema {
    _id?: ObjectId;
  }
}
