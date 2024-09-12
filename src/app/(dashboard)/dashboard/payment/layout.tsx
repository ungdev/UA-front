'use client';

import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';

import variables from '@/variables.module.scss';
import { useSearchParams } from 'next/navigation';
import { stripe } from '@/utils/stripe';

const stripePromise = stripe;
const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  const search = useSearchParams();
  const stripeToken = search.get('stripeToken') ?? search.get('payment_intent_client_secret');

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: variables.primaryColor,
      colorBackground: variables.primaryBackground,
      colorText: variables.lightColor,
    },
  } satisfies Appearance;
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
