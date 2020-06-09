import { fork } from 'redux-saga/effects';
import { userSagas } from './user/sagas';
import { cartSagas } from './cart/sagas';
import { productSagas } from './product/sagas';

export default function* rootSaga() {
  yield fork(userSagas);
  yield fork(cartSagas);
  yield fork(productSagas);
}
