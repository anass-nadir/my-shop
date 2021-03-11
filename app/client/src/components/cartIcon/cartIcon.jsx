import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/actions';
import { getCartItemsCount } from '../../redux/cart/utils';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cartIcon.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = ({ cart }) => {
  return {
    itemCount: getCartItemsCount(cart.cartItems)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
