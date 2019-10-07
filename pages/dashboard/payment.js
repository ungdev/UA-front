/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const payment = () => {
  const { query, push } = useRouter();
  useEffect(() => {
    if (query.type === 'success') {
      toast.success('Paiement effectué avec succèes');
    }
    else if (query.type === 'error') {
      switch (query.error) {
        case 'CART_NOT_FOUND':
          toast.error('Panier introuvable');
          break;
        case 'TRANSCATION_ERROR':
          toast.error('La transaction a échoué');
          break;
        case 'NO_PAYLOAD':
          toast.error('Requête erronée');
          break;
        default:
          break;
      }
    }
    push('/dashboard');
  }, []);

  return null;
};

export default payment;
