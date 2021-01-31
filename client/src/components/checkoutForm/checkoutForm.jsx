import { connect } from 'react-redux';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';

import { makePayment } from '../../redux/cart/actions';
import { CheckoutCard } from './checkoutCard';
import './checkoutForm.scss';

const CheckoutForm = ({ price, stripe, elements, pay }) => {
  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      return;
    }
    const paymentData = {
      amount: price,
      token: result.token
    };

    pay(paymentData);
  };

  return (
    <div>
      <CheckoutCard />
      <button onClick={handleSubmit} disabled={!stripe} className='btn-pay'>
        Pay Now
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  pay: (data) => dispatch(makePayment(data))
});

const InjectedCheckoutForm = ({ price, pay }) => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          price={price}
          pay={pay}
        />
      )}
    </ElementsConsumer>
  );
};

export default connect(null, mapDispatchToProps)(InjectedCheckoutForm);
