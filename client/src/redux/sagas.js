import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/sagas';
import { cartSagas } from './cart/sagas';
import { productSagas } from './product/sagas';

export default function* rootSaga() {
  yield all([call(productSagas), call(userSagas), call(cartSagas)]);
}