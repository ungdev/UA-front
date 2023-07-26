'use client';
import { useState } from 'react';

import { Title, Input, Textarea, Button, Select } from '@/components/UI';
import { sendMessage } from '@/utils/contact';

const options = [
  'Tournoi League of Legends',
  'Tournoi Teamfight Tactics',
  'Tournoi Rocket League',
  'Tournoi Counter-Strike : Global Offensive',
  'Tournoi SSBU',
  'Tournoi osu!',
  'Tournoi Libre',
  'Problème sur le site',
  'Autre',
]
  // Transform the array to match the requested type of Select component
  .map((value) => ({
    label: value,
    value,
  }));

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Autre');

  const onSubmit = async () => {
    const isValid = await sendMessage(name, email, subject, message);

    if (isValid) {
      setName('');
      setEmail('');
      setMessage('');
      setSubject('');
    }
  };

  return (
    <div id="contact">
      <Title align="center">Contact</Title>

      <p>
        UTT Net Group
        <br />
        12 rue Marie Curie 10000 Troyes
        <br />
        <a href="mailto:UTT%20Arena<arena@utt.fr>">arena@utt.fr</a>
        <br />
        <a href="tel:+33325718550">+33 (0) 3 25 71 85 50</a>
      </p>

      <p>Tu peux nous contacter via ce formulaire, nous te répondrons dans les meilleurs délais.</p>

      <Input label="Nom" value={name} onChange={setName} />
      <Input label="Email" value={email} onChange={setEmail} type="email" />
      <Select label="Sujet" value={subject} onChange={setSubject} options={options} />
      <Textarea label="Message" value={message} onChange={setMessage} placeholder="Tape ton message ici..." />

      <Button primary onClick={onSubmit} rightIcon="fas fa-paper-plane">
        Envoyer
      </Button>
    </div>
  );
};

export default Contact;
