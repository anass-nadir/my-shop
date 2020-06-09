import { takeLatest, put } from 'redux-saga/effects';

import { userActionTypes } from '../user/types';
import { clearCart } from './actions';

function* clearCartOnLogout() {
  yield put(clearCart());
}

export function* cartSagas() {
  yield takeLatest(userActionTypes.LOGOUT_USER, clearCartOnLogout);
}
