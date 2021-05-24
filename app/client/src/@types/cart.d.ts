interface ICart {
  _id: string;
  products: IProduct[] | [];
  _userId: string;
  total: number;
}

interface ICartState {
  isFetching: boolean;
  hidden: boolean;
  products: IProduct[] | [];
  total: number;
  errors?: [];
}
