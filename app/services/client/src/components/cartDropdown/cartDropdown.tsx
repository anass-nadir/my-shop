import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import CartItem from '../cartItem/cartItem';

import { toggleCartHidden } from '../../redux/cart/slice';

import './cartDropdown.scss';

const CartDropdown = () => {
  const cartItems: readonly IProduct[] = useAppSelector(
    ({ cart }) => cart.products
  );
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {(cartItems &&
          cartItems.map(cartItem => (
            <CartItem key={cartItem._id} {...cartItem} />
          ))) || <span className='empty-message'>Your cart is empty</span>}
      </div>
      <button
        onClick={() => {
          dispatch(toggleCartHidden());
          push('/checkout');
        }}
        className='custom-button'
      >
        GO TO CHECKOUT
      </button>
    </div>
  );
};

export default CartDropdown;
