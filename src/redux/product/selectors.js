import { createSelector } from 'reselect';

const selectProducts = state => state.product;

export const selectAllProducts = createSelector(
  [selectProducts],
  product => product.products
);

export const selectIsFetching = createSelector(
  [selectProducts],
  product => product.isFetching
);

export const selectAllCategories = createSelector(
  [selectProducts],
  product => product.categories
);


export const selectCollection = collectionId =>
  createSelector(
    [selectAllProducts],
    product => product.filter(pr => pr._id === collectionId)[0] || []
  );