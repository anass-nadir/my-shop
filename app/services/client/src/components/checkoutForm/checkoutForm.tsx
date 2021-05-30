// import { useAppDispatch } from '../../redux/hooks';

import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';

import { CheckoutCard } from './checkoutCard';
import './checkoutForm.scss';
import { Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';

interface ICheckoutFormProps {
  price: number;
  stripe: Stripe | null;
  elements: StripeElements | null;
}
const CheckoutForm = ({ price, stripe, elements }: ICheckoutFormProps) => {
  // const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const result = await stripe.createToken(card as StripeCardElement);

    if (result.error) {
      return;
    }
    // const paymentData = {
    //   amount: price,
    //   token: result.token
    // };

    // dispatch(makePayment(paymentData));
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

const InjectedCheckoutForm = ({ price }: any) => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} price={price} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCheckoutForm;
