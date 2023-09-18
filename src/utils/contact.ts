import { toast } from 'react-toastify';

import { API } from '@/utils/api';
import { emailIsValid } from '@/utils/email';

export const sendMessage = async (name: string, email: string, subject: string, message: string) => {
  // Check if fields are filled
  if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
    toast.error('Merci de remplir tous les champs');
    return false;
  }
  // Check if email is valid
  if (!emailIsValid(email)) {
    toast.error("Merci d'entrer une adresse email valide");
    return false;
  }

  // Send message via API
  await API.post('/contact', { name, email, subject, message });

  toast.success('Ton message à bien été envoyé !');

  return true;
};
