import { loadStripe } from '@stripe/stripe-js';
import { stripePublicKey } from '@/utils/environment';

export const stripe = loadStripe(stripePublicKey());
