'use client';
import styles from './style.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Title, Input, Textarea, Button, Select, Collapse } from '@/components/UI';
import { sendMessage } from '@/utils/contact';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';
import { uploadsUrl } from '@/utils/environment';
import { fetchFaqs } from '@/modules/admin';
import { RootState } from '@/lib/store';

interface Question {
  question: string;
  answer: React.ReactNode;
}

interface FaqByCategory {
  [category: string]: Question[];
}

export const useFaq = () => {
  const dispatch = useDispatch<any>();
  const faqsFromStore = useSelector((state: RootState) => state.admin.faqs || []);

  // ⚡ On garde le même nom `faq` pour ton front
  const [faq, setFaq] = useState<FaqByCategory>({});

  useEffect(() => {
    dispatch(fetchFaqs()); // fetch API
  }, [dispatch]);

  useEffect(() => {
    const grouped: FaqByCategory = {};

    faqsFromStore
      .filter((f) => f.display) // uniquement celles affichables
      .forEach((f) => {
        if (!grouped[f.category]) grouped[f.category] = [];
        grouped[f.category].push({
          question: f.question,
          answer: <>{f.answer}</>, // wrap JSX si nécessaire
        });
      });

    setFaq(grouped);
  }, [faqsFromStore]);

  return faq;
};

const Help = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Autre');

  const pathName = usePathname();

  const user = useAppSelector((state) => state.login.user);

  const tournaments = useAppSelector((state) => state.tournament.tournaments);

  const faq = useFaq();

  const options = tournaments
    ? [...tournaments!.map((tournament) => 'Tournoi ' + tournament.name), 'Problème sur le site', 'Autre']
        // Transform the array to match the requested type of Select component
        .map((value) => ({
          label: value,
          value,
        }))
    : [];
  useEffect(() => {
    // Scroll to the element if the hash is present in the url
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        // Scroll to the element to make it center on the page
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (user) {
      setName(user.firstname + ' ' + user.lastname);
      setEmail(user.email);
    }
  }, []);

  const onSubmit = async () => {
    const isValid = await sendMessage(name, email, subject, message);

    if (isValid) {
      setName('');
      setEmail('');
      setMessage('');
      setSubject('');

      if (user) {
        setName(user.firstname + ' ' + user.lastname);
        setEmail(user.email);
      }
    }
  };

  // get current link eg. https://arena.utt.fr/help#test but without any get parameters (eg. ?id=faq) or hash (eg. #faq)
  const currentLink = `${window.location.origin}${pathName}`;

  return (
    <div className={styles.helpContainer}>
      <div id="faq" className={styles.faq}>
        <Title level={2} type={1} align="center">
          FAQ
        </Title>

        {Object.keys(faq).map((category: string) => (
          <div key={category} id={category} className={styles.category}>
            <p className={styles.categoryTitle}>{category}</p>
            {faq[category].map((question: Question, index: number) => (
              <Collapse
                key={`${category}-${index}`}
                title={question.question}
                id={`${category
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')}-${index}`}
                link={currentLink}
                initVisible={
                  window.location.hash ===
                  `#${category
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')}-${index}`
                }>
                <div className={styles.answer}>{question.answer}</div>
              </Collapse>
            ))}
          </div>
        ))}
      </div>
      <div id="contact" className={styles.contact}>
        <Title level={2} type={1} align="center">
          Contact
        </Title>

        <p>
          <strong>Tu n’as pas trouvé la réponse à ta question ?</strong>
        </p>
        <p>
          Tu peux nous contacter via le formulaire ci-dessous ou bien envoyer ton message sur le{' '}
          <Link href="https://discord.gg/tkRrVZYXmT" target="_blank" rel="noopener" className={styles.darkBackground}>
            serveur Discord de l’UTT Arena
          </Link>
          .
        </p>

        <p>
          UTT Net Group
          <br />
          12, rue Marie Curie 10 000 Troyes
          <br />
          <a href="mailto:UTT%20Arena<arena@utt.fr>" className={styles.darkBackground}>
            arena@utt.fr
          </a>
          <br />
          <a href="tel:+33325718550" className={styles.darkBackground}>
            +33 (0) 3 25 71 85 50
          </a>
        </p>

        <Input label="Nom" value={name} onChange={setName} />
        <Input label="Email" value={email} onChange={setEmail} type="email" />
        <Select label="Sujet" value={subject} onChange={setSubject} options={options} />
        <Textarea label="Message" value={message} onChange={setMessage} placeholder="Tape ton message ici..." />

        <Button primary onClick={onSubmit} veryLong>
          Envoyer
        </Button>
      </div>
    </div>
  );
};

export default Help;
