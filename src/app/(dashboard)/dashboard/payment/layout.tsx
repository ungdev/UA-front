'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
import variables from '@/variables.module.scss';
import { useSearchParams } from 'next/navigation';

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
