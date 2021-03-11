import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cart/reducer';
import userReducer from './user/reducer';
import productReducer from './product/reducer';
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
