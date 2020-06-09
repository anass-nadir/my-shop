import { fork } from 'redux-saga/effects';
import { userSagas } from './user/sagas';
import { cartSagas } from './cart/sagas';

export default function* rootSaga() {
  yield fork(userSagas);
  yield fork(cartSagas);
}
