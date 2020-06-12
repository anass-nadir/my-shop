import { takeLatest, put, call, select } from 'redux-saga/effects';

import { userActionTypes } from '../user/types';

import { cartActionTypes } from './types';
import { getCartItemsService, pushCartService } from './services';

const getCart = (state) => state.cart;

function* fetchCart() {
  const response = yield call(getCartItemsService);
  try {
    if (response.data && response.data.cart)
      yield put({
        type: cartActionTypes.FETCH_CART_SUCCESS,
        response: JSON.parse(response.data.cart.items)
      });
    else yield put({ type: cartActionTypes.FETCH_CART_ERROR });
  } catch (error) {
    yield put({ type: cartActionTypes.FETCH_CART_ERROR });
  }
}
function* pushToCart() {
  const cart = yield select(getCart);
  try {
    yield call(pushCartService, cart.cartItems);
  } catch (error) {
    yield put({ type: cartActionTypes.PUSH_TO_CART_ERROR });
  }
}
function* pushToCartOnLogout({ payload }) {
  try {
    yield pushToCart();
    yield put({ type: cartActionTypes.CLEAR_CART });
    return typeof payload == 'function' && payload();
  } catch (error) {
    yield put({ type: cartActionTypes.PUSH_TO_CART_ERROR });
  }
}
export function* cartSagas() {
  yield takeLatest(userActionTypes.LOGOUT_USER, pushToCartOnLogout);
  yield takeLatest(cartActionTypes.FETCH_CART, fetchCart);
  yield takeLatest(cartActionTypes.PUSH_TO_CART, pushToCart);
}
