import { createSelector } from 'reselect';

const selectProducts = state => state.product;

export const selectAllProducts = createSelector(
  [selectProducts],
  product => product.products
);

export const selectIsProductsFetching = createSelector(
  [selectProducts],
  product => product.isFetching
);