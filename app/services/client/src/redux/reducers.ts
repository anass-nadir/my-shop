import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cart/slice';
import userReducer from './user/slice';
import productReducer from './product/slice';
const persistConfig = {
  key: 'my-shop',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  product: productReducer
});

export default persistReducer(persistConfig, rootReducer);
