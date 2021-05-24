interface IProduct {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  imagesUrls?: string[];
  details?: [];
}
type IInventory = {
  category: ICategory;
  products: IProduct[];
};

type IProductState = {
  isFetching: boolean;
  inventory: IInventory[] | [];
  categories?: ICategory[];
  errors: IValidationError[] | null;
};
