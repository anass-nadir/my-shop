import { put, call, takeLatest } from 'redux-saga/effects';
import {
  registerService,
  loginService,
  checkUserTokenService
} from './services';

import { userActionTypes } from '../user/types';

function* registerSaga(payload) {
  try {
    const response = yield call(registerService, payload);
    if(response.success)
    yield put({ type: userActionTypes.LOGIN_USER_SUCCESS, response });
    else 
    yield put({ type: userActionTypes.REGISTER_USER_ERROR, response });
  } catch (error) {
    yield put({ type: userActionTypes.REGISTER_USER_ERROR, response:{success: false, error: error.message} });
  }
}

function* loginSaga(payload) {
  try {
    const response = yield call(loginService, payload);
    if(response.success)
    yield put({ type: userActionTypes.LOGIN_USER_SUCCESS, response });
    else
    yield put({ type: userActionTypes.LOGIN_USER_ERROR, response });
  } catch (error) {
    yield put({ type: userActionTypes.LOGIN_USER_ERROR, response:{success: false, error: error.message} });
  }
}

function* checkUserTokenSaga() {
  try {
    const response = yield call(checkUserTokenService);
    if(response&&response.success)
    yield put({ type: userActionTypes.LOGIN_USER_SUCCESS, response });
    else
    yield put({ type: userActionTypes.LOGIN_USER_ERROR, response:{success: false} });
  } catch (error) {
    yield put({ type: userActionTypes.LOGIN_USER_ERROR,response:{success: false, error: error.message} });
  }
}

export function* userSagas() {
  yield takeLatest(userActionTypes.REGISTER_USER, registerSaga);
  yield takeLatest(userActionTypes.LOGIN_USER, loginSaga);
  yield takeLatest(userActionTypes.CHECK_TOKEN, checkUserTokenSaga);
}
