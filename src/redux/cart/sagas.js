import { takeLatest, put, call } from 'redux-saga/effects';

import { userActionTypes } from '../user/types';
import { clearCart } from './actions';
import { cartActionTypes } from './types';
import { getCartItemsService, pushCartService } from './services';
function* clearCartOnLogout() {
  yield put(clearCart());
}

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
export function* cartSagas() {
  yield takeLatest(userActionTypes.LOGOUT_USER, clearCartOnLogout);
  yield takeLatest(cartActionTypes.FETCH_CART, fetchCart);
}
