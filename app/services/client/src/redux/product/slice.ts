import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';

import * as thunks from './thunks';

const INITIAL_STATE: IProductState = {
  isFetching: false,
  categories: [],
  inventory: [],
  errors: []
};
export const userSlice = createSlice({
  name: 'product',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(thunks.getCategories.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isFetching: false,
          categories: payload['categories']
        };
      })
      .addCase(thunks.getInventory.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isFetching: false,
          inventory: payload['inventory']
        };
      });
    builder
      .addMatcher(
        isPending(thunks.getCategories, thunks.getInventory),
        state => {
          return {
            ...state,
            isFetching: true
          };
        }
      )
      .addMatcher(
        isRejected(thunks.getCategories, thunks.getInventory),
        (state, action) => {
          return {
            ...state,
            isFetching: false,
            errors: action.payload
              ? action.payload['errors']
              : (action.error as IValidationError)
          };
        }
      );
  }
});

export default userSlice.reducer;
