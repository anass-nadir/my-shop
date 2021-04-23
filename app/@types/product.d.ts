declare namespace IProduct {
  export interface Schema {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    imageUrl: string;
    details?: [];
  }
  export interface TestPayload {
    categoryId?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    imageUrl?: string;
    details?: [];
  }
}
declare namespace ICategory {
  export interface Schema {
    title: string;
    slug: string;
    imageUrl: string;
  }
}
