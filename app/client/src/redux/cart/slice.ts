import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction
} from '@reduxjs/toolkit';

import * as thunks from './thunks';
import { addItemToCart, getCartTotal, removeItemFromCart } from './utils';

const INITIAL_STATE: ICartState = {
  hidden: true,
  isFetching: false,
  errors: [],
  total: 0,
  products: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    toggleCartHidden(state) {
      state.hidden = !state.hidden;
    },
    addItem(state, { payload }: PayloadAction<IProduct>) {
      state.products = addItemToCart(state.products, payload);
      state.total = getCartTotal(state.products);
    },
    removeItem(state, { payload }: PayloadAction<IProduct>) {
      return {
        ...state,
        products: removeItemFromCart(state.products, payload)
      };
    },
    clearItemFromCart(state, { payload }: PayloadAction<IProduct>) {
      return {
        ...state,
        products: state.products.filter(
          cartItem => cartItem._id !== payload._id
        )
      };
    }
  },
  extraReducers: builder => {
    builder.addCase(thunks.fetchCart.fulfilled, (state, { payload }) => {
      if (payload['cart'].length) state.products = payload['cart'][0].products;

      state.isFetching = false;
    });
    builder
      .addMatcher(isPending(thunks.fetchCart, thunks.refreshCart), state => {
        return {
          ...state,
          isFetching: true
        };
      })
      .addMatcher(isFulfilled(thunks.refreshCart), state => {
        return {
          ...state,
          products: [],
          isFetching: false
        };
      })
      .addMatcher(
        isRejected(thunks.fetchCart, thunks.refreshCart),
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

export default cartSlice.reducer;
export const {
  addItem,
  clearItemFromCart,
  removeItem,
  toggleCartHidden
} = cartSlice.actions;
