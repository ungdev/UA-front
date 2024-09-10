'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
import variables from '@/variables.module.scss';

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stripeToken = urlParams.get('stripeToken') || urlParams.get('payment_intent_client_secret');
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: variables.primaryColor,
      colorBackground: variables.primaryBackground,
      colorText: variables.lightColor,
    },
  };
  const options = {
    clientSecret: stripeToken,
    appearance,
  } as StripeElementsOptions;

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default PaymentLayout;
