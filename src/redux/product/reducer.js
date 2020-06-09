import { productActionTypes } from './types';

const INITIAL_STATE = {
  isFetching: false,
  success: false,
  products: []
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        isFetching: true
      };
    case productActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: action.response.success,
        products: action.response.data.products || null
      };
    case productActionTypes.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        isFetching: false,
        success: false
      };
    default:
      return state;
  }
};

export default productReducer;
