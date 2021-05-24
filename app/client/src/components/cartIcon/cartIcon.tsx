import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/slice';
import { getCartItemsCount } from '../../redux/cart/utils';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cartIcon.scss';

const CartIcon = () => {
  const itemCount = useSelector(
    (cart: ICartState) => cart.products && getCartItemsCount(cart.products)
  );
  const dispatch = useDispatch();
  return (
    <div className='cart-icon' onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  );
};

export default CartIcon;
