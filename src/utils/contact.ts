import { toast } from 'react-toastify';

import { API } from './api';
import { emailIsValid } from './email';

export const sendMessage = async (name: string, email: string, subject: string, message: string) => {
  // Check if fields are filled
  if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
    toast.error('Veuillez remplir tous les champs');
    return false;
  }
  // Check if email is valid
  if (!emailIsValid(email)) {
    toast.error('Veuillez entrer une adresse email valide');
    return false;
  }

  // Send message via API
  await API.post('/contact', { name, email, subject, message });

  toast.success('Votre message à bien été envoyé !');

  return true;
};
