declare module 'IProduct' {
  export interface IProductSchema {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    imageUrl: string;
    details?: [];
  }
  export interface IProductTestPayload {
    categoryId?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    imageUrl?: string;
    details?: [];
  }
}
declare module 'ICategory' {
  export interface ICategorySchema {
    title: string;
    slug: string;
    imageUrl: string;
  }
}
