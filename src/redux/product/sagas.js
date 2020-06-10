import { takeLatest, put, call } from 'redux-saga/effects';

import { productActionTypes } from '../product/types';
import { getProductsService, getCategoriesService } from './services'

function* fetchAllProducts() {
  try {
    const response = yield call(getProductsService);
    if(response.success)
    yield put({ type: productActionTypes.FETCH_PRODUCTS_SUCCESS, response });
    else
    yield put({ type: productActionTypes.FETCH_PRODUCTS_ERROR });
  } catch (error) {
    yield put({ type: productActionTypes.FETCH_PRODUCTS_ERROR });
  }
}

function* fetchAllCategories() {
  try {
    const response = yield call(getCategoriesService);
    if(response.success)
    yield put({ type: productActionTypes.FETCH_CATEGORIES_SUCCESS, response });
    else
    yield put({ type: productActionTypes.FETCH_CATEGORIES_ERROR });
  } catch (error) {
    yield put({ type: productActionTypes.FETCH_CATEGORIES_ERROR });
  }
}
export function* productSagas() {
  yield takeLatest(productActionTypes.FETCH_PRODUCTS, fetchAllProducts);
  yield takeLatest(productActionTypes.FETCH_CATEGORIES, fetchAllCategories);
}
