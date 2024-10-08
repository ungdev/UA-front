'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useStripe } from '@stripe/react-stripe-js';
import { PaymentIntentResult } from '@stripe/stripe-js';
import { Loader } from '@/components/UI';
import styles from '../style.module.scss';

const Payment = () => {
  const router = useRouter();
  const search = useSearchParams();
  const clientSecret = search.get('payment_intent_client_secret');
  const stripe = useStripe();

  useEffect(() => {
    if (!stripe || !clientSecret) {
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
        toast.error(
          'Le paiement est en cours de traitement. Vous recevrez un email de confirmation une fois le paiement effectué.',
        );
      } else {
        toast.error("Une erreur inattendue s'est produite lors du paiement.");
      }

      router.push('/dashboard');
    });
  }, [stripe, clientSecret]);

  return (
    <div className={styles.loader}>
      <Loader />
    </div>
  );
};

export default Payment;
