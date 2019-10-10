import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Title, Input, Textarea, Button, Select } from '../components/UI';
import { postToSlack } from '../utils';

const options = [
  { label: 'Tournoi LoL (Pro)', value: 'LoL pro' },
  { label: 'Tournoi LoL (Amateur)', value: 'LoL amateur' },
  { label: 'Tournoi Fortnite', value: 'Fortnite' },
  { label: 'Tournoi CS:GO', value: 'CS:GO' },
  { label: 'Tournoi SSBU', value: 'SSBU' },
  { label: 'Tournoi OSU', value: 'osu!' },
  { label: 'Tournoi Libre', value: 'Libre' },
  { label: 'J\'ai eu une erreur sur le site', value: 'Erreur' },
  { label: 'Signaler un bug', value: 'Bug' },
  { label: 'Autre', value: 'Autre' },
];

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;

const Contact = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('Autre');

  const sendMessage = () => {
    if (firstname === '' || lastname === '' || email === '' || content === '') {
      toast.error('Veuillez remplir tous les champs');
    }
    else if (!emailRegex.test(email)) {
      toast.error('Veuillez entrer une adresse email valide');
    }
    else {
      postToSlack(firstname, lastname, email, subject, content);

      toast.success('Votre message à bien été envoyé !');
      setFirstname('');
      setLastname('');
      setEmail('');
      setContent('');
    }
  };

  return (
    <div id="contact">
      <Title align="center" uppercase>Contact</Title>
      <p>
        UTT Net Group<br />
        12 rue Marie Curie 10000 Troyes<br />
        <a href="mailto:UTT%20Arena<arena@utt.fr>">arena@utt.fr</a><br />
        <a href="tel:0325718550">0325718550</a>
      </p>

      <Title level={3}>Formulaire</Title>
      <Input
        label="Prénom"
        value={firstname}
        onChange={setFirstname}
      />
      <Input
        label="Nom"
        value={lastname}
        onChange={setLastname}
      />
      <Input
        label="Email"
        value={email}
        onChange={setEmail}
        type="email"
      />
      <Select
        label="Sujet"
        options={options}
        value={subject}
        onChange={setSubject}
      />
      <Textarea
        label="Message"
        placeholder="Tapez votre message ici..."
        value={content}
        onChange={setContent}
      />

      <Button primary onClick={sendMessage}>
        Envoyer
      </Button>
    </div>
  );
};

export default Contact;