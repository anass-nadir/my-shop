import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import * as thunks from './thunks';
const INITIAL_STATE: IUserState = {
  currentUser: null,
  isFetching: false,
  cookiePresent: localStorage.getItem('cookie-present'),
  errors: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(thunks.logoutUser.fulfilled, state => {
      removeCookiePresent();
      return {
        ...state,
        isFetching: false,
        cookiePresent: null,
        currentUser: null
      };
    });
    builder
      .addMatcher(
        isFulfilled(
          thunks.loginUser,
          thunks.registerUser,
          thunks.getCurrentUser
        ),
        (state, action) => {
          setCookiePresent();
          return {
            ...state,
            isFetching: false,
            cookiePresent: true,
            currentUser: action.payload
          };
        }
      )
      .addMatcher(
        isPending(thunks.loginUser, thunks.registerUser, thunks.getCurrentUser),
        state => {
          return {
            ...state,
            isFetching: true
          };
        }
      )
      .addMatcher(
        isRejected(
          thunks.loginUser,
          thunks.registerUser,
          thunks.getCurrentUser
        ),
        (state, action) => {
          removeCookiePresent();
          return {
            ...state,
            isFetching: false,
            cookiePresent: null,
            errors: action.payload
              ? action.payload['errors']
              : (action.error as IValidationError)
          };
        }
      );
  }
});

const setCookiePresent = () => {
  localStorage.setItem('cookie-present', 'true');
};

const removeCookiePresent = () => {
  localStorage.removeItem('cookie-present');
};

export default userSlice.reducer;
