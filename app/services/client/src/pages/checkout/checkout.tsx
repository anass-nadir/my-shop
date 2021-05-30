import React from 'react';

import CheckoutItem from '../../components/checkoutItem/checkoutItem';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/checkoutForm/checkoutForm';

import { getCartTotal } from '../../redux/cart/utils';

import './checkout.scss';
import { useAppSelector } from '../../redux/hooks';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);
  }
  return stripePromise;
};

const CheckoutPage = () => {
  const { cartItems, total } = useAppSelector(({ cart: { products } }) => {
    return { cartItems: products, total: getCartTotal(products) };
  });
  return (
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
      {cartItems.map((cartItem: any) => (
        <CheckoutItem key={cartItem._id} {...cartItem} />
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
};

export default CheckoutPage;
