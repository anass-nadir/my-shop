import React from 'react';
import { connect } from 'react-redux';

import CheckoutItem from '../../components/checkoutItem/checkoutItem';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/checkoutForm/checkoutForm';

import { getCartTotal } from '../../redux/cart/utils';

import './checkout.scss';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
};

const CheckoutPage = ({ cartItems, total }) => (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem._id} cartItem={cartItem} />
    ))}
    <div className='total'>TOTAL: ${total}</div>
    <div className='warning'>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242
    </div>
    <Elements stripe={getStripe()}>
      <CheckoutForm price={total} />
    </Elements>
  </div>
);

const mapStateToProps = ({ cart }) => {
  return {
    cartItems: cart.cartItems,
    total: getCartTotal(cart.cartItems)
  };
};
export default connect(mapStateToProps)(CheckoutPage);
