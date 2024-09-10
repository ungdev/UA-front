'use client';

import { stripe } from '@/utils/stripe';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';

const Potato = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stripeToken = urlParams.get('stripeToken');
  return (
    <div>
      <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret: stripeToken }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Potato;
