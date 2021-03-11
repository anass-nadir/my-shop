import { takeLatest, put, call, select, all } from 'redux-saga/effects';

import { cartActionTypes } from './types';
import {
  getCartItemsService,
  pushCartService,
  stripePaymentService
} from './services';

const getCart = state => state.cart;
const getCurrentUser = state => state.user?.currentUser;

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
function* makePayment({ payload }) {
  const currentUser = yield select(getCurrentUser);
  const cart = yield select(getCart);
  try {
    const response = yield call(stripePaymentService, {
      ...payload,
      customer: {
        name: currentUser.name,
        email: currentUser.email,
        customerId: currentUser?.customerId
      },
      cartItems: cart.cartItems
    });
    if (response.success)
      yield put({ type: cartActionTypes.MAKE_PAYMENT_SUCCESS });
    else yield put({ type: cartActionTypes.MAKE_PAYMENT_ERROR });
  } catch (error) {
    yield put({
      type: cartActionTypes.MAKE_PAYMENT_ERROR
    });
  }
}
function* onFetchCart() {
  yield takeLatest(cartActionTypes.FETCH_CART, fetchCart);
}
function* onPushToCart() {
  yield takeLatest(cartActionTypes.PUSH_TO_CART, pushToCart);
}
function* onMakePayment() {
  yield takeLatest(cartActionTypes.MAKE_PAYMENT, makePayment);
}
export function* cartSagas() {
  yield all([call(onFetchCart), call(onPushToCart), call(onMakePayment)]);
}
