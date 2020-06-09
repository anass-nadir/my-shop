import { userActionTypes } from './types';

const INITIAL_STATE = {
  currentUser: null,
  success: false,
  response: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        success: action.response.success,
        currentUser: action.response.data.user || null
      };
    case userActionTypes.LOGIN_USER_ERROR:
    case userActionTypes.REGISTER_USER_ERROR:
      return {
        ...state,
        response: action.response.error || null,
        success: action.response.success,
        currentUser: null
      };
    case userActionTypes.LOGOUT_USER:
      return {
        ...state,
        response: null,
        currentUser: null
      };
    default:
      return state;
  }
};

export default userReducer;
