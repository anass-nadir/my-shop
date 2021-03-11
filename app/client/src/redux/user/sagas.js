import { put, call, all, takeLatest } from 'redux-saga/effects';
import {
  registerService,
  loginService,
  getProfileService,
  requestLogoutService
} from './services';

import { userActionTypes } from './types';
import { cartActionTypes } from '../cart/types';
function* registerSaga(payload) {
  try {
    const response = yield call(registerService, payload);
    if (response.success)
      yield put({ type: userActionTypes.LOGIN_USER_SUCCESS, response });
    else yield put({ type: userActionTypes.REGISTER_USER_ERROR, response });
  } catch (error) {
    yield put({
      type: userActionTypes.REGISTER_USER_ERROR,
      response: { success: false, error: error.message }
    });
  }
}

function* loginSaga(payload) {
  try {
    const response = yield call(loginService, payload);
    if (response.success) {
      yield put({ type: userActionTypes.LOGIN_USER_SUCCESS, response });
      yield put({ type: cartActionTypes.FETCH_CART });
    } else yield put({ type: userActionTypes.LOGIN_USER_ERROR, response });
  } catch (error) {
    yield put({
      type: userActionTypes.LOGIN_USER_ERROR,
      response: { success: false, error: error.message }
    });
  }
}

function* getProfileSaga() {
  try {
    const response = yield call(getProfileService);
    if (response.success)
      yield put({ type: userActionTypes.GET_PROFILE_SUCCESS, response });
    else yield put({ type: userActionTypes.GET_PROFILE_ERROR, response });
  } catch (error) {
    yield put({ type: userActionTypes.GET_PROFILE_ERROR });
  }
}
function* logoutSaga() {
  try {
    const response = yield call(requestLogoutService);
    if (response.success) yield put({ type: userActionTypes.LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: userActionTypes.GET_PROFILE_ERROR });
  }
}

export function* onSignUp() {
  yield takeLatest(userActionTypes.REGISTER_USER, registerSaga);
}

export function* onSignIn() {
  yield takeLatest(userActionTypes.LOGIN_USER, loginSaga);
}
export function* onLogout() {
  yield takeLatest(userActionTypes.LOGOUT_USER, logoutSaga);
}
export function* onGetProfile() {
  yield takeLatest(userActionTypes.GET_PROFILE, getProfileSaga);
}
export function* userSagas() {
  yield all([
    call(onSignUp),
    call(onSignIn),
    call(onLogout),
    call(onGetProfile)
  ]);
}
