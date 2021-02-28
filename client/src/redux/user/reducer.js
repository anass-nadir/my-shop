import { userActionTypes } from './types';
import { setUserLocally, logoutUserLocally } from './utils'

const INITIAL_STATE = {
  currentUser: null,
  response: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN_USER_SUCCESS:
    case userActionTypes.GET_PROFILE_SUCCESS:
      setUserLocally(action?.response.user._id)
      return {
        ...state,
        currentUser: action?.response.user
      };
    case userActionTypes.LOGIN_USER_ERROR:
    case userActionTypes.REGISTER_USER_ERROR:
      return {
        ...state,
        response: action?.response.error
      };
    case userActionTypes.GET_PROFILE_ERROR:
    case userActionTypes.LOGOUT_SUCCESS: {
      logoutUserLocally()
      return {
        ...state,
        currentUser: null
      };
    }
    default:
      return state;
  }
};

export default userReducer;
