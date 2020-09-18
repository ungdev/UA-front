import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Title, Input, Textarea, Button, Select } from '../components/UI';
import { API } from '../utils';

const options = [
  { label: 'Tournoi LoL (Pro)', value: 'Tournoi LoL (Pro)' },
  { label: 'Tournoi LoL (Amateur)', value: 'Tournoi LoL (Amateur)' },
  { label: 'Tournoi Fortnite', value: 'Tournoi Fortnite' },
  { label: 'Tournoi CS:GO', value: 'Tournoi CS:GO' },
  { label: 'Tournoi SSBU', value: 'Tournoi SSBU' },
  { label: 'Tournoi osu!', value: 'Tournoi osu!' },
  { label: 'Tournoi libre', value: 'Tournoi libre' },
  { label: "J'ai eu une erreur sur le site", value: "J'ai eu une erreur sur le site" },
  { label: 'Signaler un bug', value: 'Signaler un bug' },
  { label: 'Autre', value: 'Autre' },
];

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;

const Contact = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Autre');

  const sendMessage = () => {
    if (firstname === '' || lastname === '' || email === '' || message === '') {
      toast.error('Veuillez remplir tous les champs');
    } else if (!emailRegex.test(email)) {
      toast.error('Veuillez entrer une adresse email valide');
    } else {
      API.post('/contact', { firstname, lastname, email, subject, message });

      toast.success('Votre message à bien été envoyé !');
      setFirstname('');
      setLastname('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div id="contact">
      <Title align="center" uppercase>
        Contact
      </Title>
      <p>
        UTT Net Group
        <br />
        12 rue Marie Curie 10000 Troyes
        <br />
        <a href="mailto:UTT%20Arena<arena@utt.fr>">arena@utt.fr</a>
        <br />
        <a href="tel:0325718550">0325718550</a>
      </p>

      <Title level={3}>Formulaire</Title>
      <Input label="Prénom" value={firstname} onChange={setFirstname} />
      <Input label="Nom" value={lastname} onChange={setLastname} />
      <Input label="Email" value={email} onChange={setEmail} type="email" />
      <Select label="Sujet" options={options} value={subject} onChange={setSubject} />
      <Textarea label="Message" placeholder="Tapez votre message ici..." value={message} onChange={setMessage} />

      <Button primary onClick={sendMessage}>
        Envoyer
      </Button>
    </div>
  );
};

export default Contact;
