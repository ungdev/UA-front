'use client';
import { useEffect } from 'react';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

interface SearchParams extends ReadonlyURLSearchParams {
  type?: string;
  error?: string;
}

const Payment = () => {
  const router = useRouter();
  const query: SearchParams = useSearchParams();

  useEffect(() => {
    if (query.type === 'success') {
      toast.success('Paiement effectué avec succès');
    } else if (query.type === 'error') {
      switch (query.error) {
        case 'CART_NOT_FOUND':
          toast.error('Panier introuvable');
          break;
        case 'TRANSACTION_ERROR':
          toast.error('La transaction a échoué');
          break;
        case 'NO_PAYLOAD':
          toast.error('Requête erronée');
          break;
        default:
          break;
      }
    }
    router.push('/dashboard');
  }, []);

  return null;
};

export default Payment;
