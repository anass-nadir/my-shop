import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartItem from '../cartItem/cartItem';

import { toggleCartHidden } from '../../redux/cart/actions';

import './cartDropdown.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem._id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <button
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
      className='custom-button'
    >
      GO TO CHECKOUT
    </button>
  </div>
);

const mapStateToProps = ({ cart }) => {
  return {
    cartItems: cart.cartItems
  };
};

export default withRouter(connect(mapStateToProps)(CartDropdown));