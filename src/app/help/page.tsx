'use client';
import { useState } from 'react';

import { Title, Input, Textarea, Button, Select, Collapse } from '@/components/UI';
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

interface Question {
  question: string;
  answer: string;
}

interface Faq {
  [key: string]: Question[];
}

const faq: Faq = {
  'Général': [
    {
      'question': 'Quand commencent les tournois ?',
      'answer': 'Les tournois commencent le samedi à 10h00.'
    },
    {
      'question': 'Quand commencent les tournois ?',
      'answer': 'Les tournois commencent le samedi à 10h00.'
    },
    {
      'question': 'Quand commencent les tournois ?',
      'answer': 'Les tournois commencent le samedi à 10h00.'
    },
  ],
  'Paiement': [
    {
      'question': 'Puis-je payer en espèces ?',
      'answer': 'Non, nous n\'acceptons pas les paiements en espèces.'
    },
    {
      'question': 'Puis-je payer en espèces ?',
      'answer': 'Non, nous n\'acceptons pas les paiements en espèces.'
    },
    {
      'question': 'Puis-je payer en espèces ?',
      'answer': 'Non, nous n\'acceptons pas les paiements en espèces.'
    },
  ],
} as Faq;

const Help = () => {
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

  // get current link eg. https://arena.utt.fr/help#test but without any get parameters (eg. ?id=faq) or hash (eg. #faq)
  const currentLink = window.location.href.split(/[?#]/)[0];

  return (
    <div className='help-container'>
      <div id="faq">
        <Title align="center">FAQ</Title>
        
        {Object.keys(faq).map((category: string) => (
          <div id={category} className='category'>
            <p className='category-title'>{category}</p>
            {faq[category].map((question: Question, index: number) => (
              <Collapse title={question.question} id={`${category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}-${index}`} link={currentLink}>
                <p>{question.answer}</p>
              </Collapse>
            ))}
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default Help;
