import { connect } from 'react-redux';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import axios from '../../utils/axios';

import { CheckoutCard } from './checkoutCard';
import './checkoutForm.scss';

const CheckoutForm = ({ price, email, stripe, elements }) => {
  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      return;
    }
    axios
      .post(
        '/cart/payment',
        {
          amount: price * 100,
          email,
          token: result.token
        },
        {
          privateRoute: true
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('Payment Error: ', error);
      });
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

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { email: currentUser?.email };
};

const InjectedCheckoutForm = ({ price, email }) => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          price={price}
          email={email}
        />
      )}
    </ElementsConsumer>
  );
};

export default connect(mapStateToProps)(InjectedCheckoutForm);
