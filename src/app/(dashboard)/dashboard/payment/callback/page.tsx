'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useStripe } from '@stripe/react-stripe-js';
import { PaymentIntentResult } from '@stripe/stripe-js';
import { Loader } from '@/components/UI';
import styles from '../style.module.scss';

const Payment = () => {
  const router = useRouter();

  const stripe = useStripe();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }: PaymentIntentResult) => {
      if (!paymentIntent) {
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        toast.success('Paiement effectué avec succès');
      } else if (paymentIntent.status === 'requires_payment_method') {
        toast.error('Le paiement a échoué. Veuillez réessayer.');
      } else if (paymentIntent.status === 'processing') {
        toast.error('Le paiement est en cours de traitement.');
      } else {
        toast.error("Une erreur inattendue s'est produite lors du paiement.");
      }

      router.push('/dashboard');
    });
  }, [stripe]);

  return (
    <div className={styles.callbackLoader}>
      <Loader />
    </div>
  );
};

export default Payment;
