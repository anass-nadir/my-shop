import { takeLatest, put, call, all } from 'redux-saga/effects';

import { productActionTypes } from './types';
import { getProductsService, getCategoriesService } from './services';

function* fetchAllProducts() {
  try {
    const response = yield call(getProductsService);
    if (response.success)
      yield put({ type: productActionTypes.FETCH_PRODUCTS_SUCCESS, response });
    else yield put({ type: productActionTypes.FETCH_PRODUCTS_ERROR });
  } catch (error) {
    yield put({ type: productActionTypes.FETCH_PRODUCTS_ERROR });
  }
}

function* fetchAllCategories() {
  try {
    const response = yield call(getCategoriesService);
    if (response.success)
      yield put({
        type: productActionTypes.FETCH_CATEGORIES_SUCCESS,
        response
      });
    else yield put({ type: productActionTypes.FETCH_CATEGORIES_ERROR });
  } catch (error) {
    yield put({ type: productActionTypes.FETCH_CATEGORIES_ERROR });
  }
}
function* onGetCategories() {
  yield takeLatest(productActionTypes.FETCH_CATEGORIES, fetchAllCategories);
}

function* onGetProducts() {
  yield takeLatest(productActionTypes.FETCH_PRODUCTS, fetchAllProducts);
}
export function* productSagas() {
  yield all([call(onGetCategories), call(onGetProducts)]);
}
