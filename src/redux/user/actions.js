import { userActionTypes } from './types';

export const registerUser = (user) => {
  return {
    type: userActionTypes.REGISTER_USER,
    payload: user
  };
};

export const loginUser = (user) => {
  return {
    type: userActionTypes.LOGIN_USER,
    payload: user
  };
};

export const checkUserToken = () => {
  return {
    type: userActionTypes.CHECK_TOKEN
  };
};
export const logoutUser = () => {
  return {
    type: userActionTypes.LOGOUT_USER
  };
};
