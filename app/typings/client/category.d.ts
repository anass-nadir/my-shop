interface ICategory {
  _id?: string;
  title?: string;
  slug?: string;
  imagesUrls?: string[];
  products?: IProduct[];
}
// type ICategoryState = {
//   isFetching: boolean;
//   success: boolean;
//   products?: IProduct[];
//   categories?: [];
// };
