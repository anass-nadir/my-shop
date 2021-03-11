import { userActionTypes } from './types';

export const registerUser = user => {
  return {
    type: userActionTypes.REGISTER_USER,
    payload: user
  };
};

export const loginUser = user => {
  return {
    type: userActionTypes.LOGIN_USER,
    payload: user
  };
};

export const logoutUser = cb => {
  return {
    type: userActionTypes.LOGOUT_USER,
    payload: cb
  };
};

export const getProfile = () => ({
  type: userActionTypes.GET_PROFILE
});
