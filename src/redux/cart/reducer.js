import { cartActionTypes } from './types';
import { addItemToCart, removeItemFromCart, syncCartItems } from './utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        )
      };
    case cartActionTypes.CLEAR_CART:
    case cartActionTypes.MAKE_PAYMENT_SUCCESS:
      return {
        ...state,
        cartItems: []
      };
    case cartActionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        cartItems: JSON.parse(
          JSON.stringify(syncCartItems(state.cartItems, action.response))
        )
      };
    case cartActionTypes.PUSH_TO_CART_ERROR:
    case cartActionTypes.FETCH_CART_ERROR:
    default:
      return state;
  }
};

export default cartReducer;
