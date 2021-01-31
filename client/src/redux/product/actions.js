import { productActionTypes } from './types';

export const fetchProducts= () => ({
  type: productActionTypes.FETCH_PRODUCTS
});
export const fetchCategories= () => ({
  type: productActionTypes.FETCH_CATEGORIES
});
