'use client';

import { Button } from '@/components/UI';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useState } from 'react';
import styles from './style.module.scss';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_URL + '/dashboard/payment/callback',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, the customer will be redirected to
    // your `/payment/callback`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message!.toString());
    } else {
      setMessage("Une erreur inconnue s'est produite");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  } as StripePaymentElementOptions;

  return (
    <div className={styles.stripePaymentContainer}>
      <form id="payment-form" onSubmit={handleSubmit} className={styles.stripeForm}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button primary type="submit" disabled={isLoading || !stripe || !elements}>
          <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Payer'}</span>
        </Button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* <Cart
        cart={cart}
        tickets={tickets}
        items={items}
        teamMembers={teamMembers}
        onItemRemoved={onRemoveItem}
        onTicketRemoved={onRemoveTicket}
        onCartReset={onCartReset}
      /> */}
    </div>
  );
};

export default Payment;
