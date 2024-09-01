'use client';
import styles from './style.module.scss';
import { ReactNode, useEffect, useState } from 'react';

import { Title, Input, Textarea, Button, Select, Collapse } from '@/components/UI';
import { sendMessage } from '@/utils/contact';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';
import { uploadsUrl } from '@/utils/environment';

interface Question {
  question: string;
  answer: ReactNode;
}

interface Faq {
  [key: string]: Question[];
}

const faq: Faq = {
  Général: [
    {
      question: 'Quand commencent les tournois ?',
      answer: (
        <>
          Les tournois commencent le samedi à 10h mais les participants des tournois devront être présents le samedi à
          9h pour effectuer un check-in.
        </>
      ),
    },
    {
      question: "Quel est l'âge minimum pour participer aux tournois ?",
      answer: (
        <>
          Pour participer aux tournois, il faut avoir au minimum <strong>15 ans lors de l'évènement</strong>. Il faudra
          que tu présentes <strong>l'autorisation parentale</strong>
          <a href={`${uploadsUrl()}/Autorisation_parentale_-_UTT_Arena_2024.pdf`} target="_blank">
            {' '}
            disponible ici
          </a>
          , <strong>
            ainsi qu'une photocopie de la pièce d'identité de ton responsable légal et de la tienne
          </strong>{' '}
          avant d'accéder à l'UTT Arena.
        </>
      ),
    },
    {
      question: 'Puis-je streamer pendant les tournois ?',
      answer: (
        <>
          Seulement si tu as reçu un mail t'en donnant l'autorisation suite à ta demande. Un formulaire de demande de
          streaming est{' '}
          <a href="https://forms.gle/MMfeFuiBQGcwg9hY8" target="_blank" rel="noopener">
            disponible ici
          </a>
          . L'équipe de l'UTT Arena se réserve le droit d'accepter ou refuser ta demande, et toute personne faisant du
          streaming sans autorisation validée par l'équipe se verra sanctionnée. L'équipe de l'UTT Arena communiquera
          prochainement sur les conditions de streaming.
        </>
      ),
    },
    {
      question: 'Où puis-je trouver des joueurs pour monter une équipe ?',
      answer: (
        <>
          Sur le discord de l'UTT Arena tu trouveras sûrement d'autres joueurs qui cherchent une équipe.{' '}
          <a href="https://discord.gg/tkRrVZYXmT">Tu peux rejoindre notre Discord ici.</a>
        </>
      ),
    },
    {
      question: "Qui contacter si j'ai des questions avant ou pendant l'UTT Arena ?",
      answer: (
        <>
          N'hésite pas à demander aux responsables de ton tournoi si tu as une quelconque question ! Tu peux les
          identifier en taguant @Staff tournoi [nom du tournoi] sur le Discord de l'UTT Arena.
        </>
      ),
    },
    {
      question: 'Où puis-je trouver les règlements des tournois (formats, règles, ...) ?',
      answer: (
        <>
          Tu pourras télécharger le règlement du tournoi qui t'intéresse dans l'onglet du tournoi concerné. Il est
          important de le lire attentivement !
        </>
      ),
    },
    {
      question: "Puis-je assister à l'UTT Arena en tant que spectateur ?",
      answer: (
        <>
          Cette année, les spectateurs voulant assister à l'UTT Arena devront acheter leur place à la billetterie de
          l'UTT Arena. Venez profiter de l'ambiance de la scène, du Stand Console, avec diverses activités autour du jeu
          vidéo, et visiter les stands de nos partenaires. Vous pouvez prendre votre place en vous inscrivant sur ce
          site. <br />
          Si tu es mineur et que tu souhaites participer à l'événement, il faudra que tu présentes l'autorisation
          parentale <a href={`${uploadsUrl()}/Autorisation_parentale_-_UTT_Arena_2024.pdf`}>disponible ici</a>, ainsi
          qu'une photocopie de la pièce d'identité de ton responsable légal et de la tienne avant d'accéder à l'UTT
          Arena.
        </>
      ),
    },
  ],
  Inscription: [
    {
      question: 'Comment savoir si mon équipe est inscrite ?',
      answer: (
        <>
          Il faut que l'équipe soit complète et que <strong>tous</strong> les joueurs de l'équipe aient payé leur place.
          L'équipe est ensuite verrouillée, le statut dans l'onglet "équipe" devient vert et ton équipe est inscrite.
          <br />
          <strong>Attention :</strong> kicker un joueur de l'équipe, quitter ou dissoudre l'équipe la déverrouillera et
          vous fera perdre votre place.
        </>
      ),
    },
    {
      question: 'Combien coûte la participation à un tournoi ?',
      answer: (
        <>
          <ul>
            <li>24 € pour les joueurs du tournoi Super Smash Bros. Ultimate</li>
            <li>28 € pour les joueurs des autres tournois</li>
            <li>15 € en tant que coach, manager</li>
            <li>10 € en tant qu'accompagnateur (pour les mineurs)</li>
            <li>
              Pour les étudiants des écoles partenaires (réseau UT) : réduction de 5€. Pense à t'inscrire avec ton
              adresse mail étudiante.
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "Dans combien de tournois puis-je m'inscrire ?",
      answer: "Les tournois se jouant en simultané, tu ne peux t'inscrire qu'à un seul tournoi.",
    },
  ],
  Paiement: [
    {
      question: 'Puis-je payer en espèces ?',
      answer:
        'Il sera possible de payer en espèces sur place, mais à tes risques et périls, car il y a de fortes chances que toutes les places soient déjà parties.',
    },
    {
      question: 'Puis-je payer par PayPal ?',
      answer: 'Non, sur le site seul le paiement par carte bancaire est disponible.',
    },
    {
      question: 'Puis-je payer pour toute mon équipe ?',
      answer:
        "Oui, cette année il est possible de payer pour d'autres joueurs. Mais il faut qu'ils aient d'abord créé leur compte sur le site de l'UTT Arena et qu'ils aient rejoint ton équipe.",
    },
    {
      question: "J'ai payé ma place, puis-je encore changer de tournoi ?",
      answer: (
        <>
          Oui, tu peux changer librement de tournoi à condition que le tournoi que tu veux rejoindre soit au même prix
          que la place que tu as déjà payée. Si ce n'est pas le cas, contacte-nous !
        </>
      ),
    },
  ],
  'Tournoi Super Smash Bros Ultimate': [
    {
      question: 'Dois-je apporter ma console ?',
      answer: (
        <>
          Si tu as coché la case <strong>"Réduction si tu amènes ta propre Nintendo Switch"</strong> à l'inscription au
          tournoi, tu dois en effet apporter ta Nintendo Switch, son dock, le jeu SSBU avec <strong>tous</strong> les
          personnages, <strong>DLCs inclus</strong> et un câble HDMI, et tu bénéficies d'une <strong>réduction</strong>{' '}
          de 3€ sur le prix de ton billet. Cette option est disponible pour les 30 premiers seulement.
          <br />
          Même sans cocher cette case, tu peux apporter ta console pour jouer en freeplay.
          <br />
          <br />
          <strong>
            Si tu as indiqué que tu apportais ta console et que ce n'est pas le cas, un supplément de 6€ te sera facturé
            sur place.
          </strong>
        </>
      ),
    },
    {
      question: 'Puis-je apporter mon PC ?',
      answer: "Non, car tu n'auras pas de place pour installer ton setup.",
    },
    {
      question: 'Dois-je apporter mes manettes ?',
      answer: 'Oui. Tu dois apporter tes manettes de Switch ou ta manette de GameCube sans oublier ton adaptateur.',
    },
  ],
} as Faq;

const Help = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Autre');

  const pathName = usePathname();

  const user = useAppSelector((state) => state.login.user);

  const tournaments = useAppSelector((state) => state.tournament.tournaments);

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
                <p>{question.answer}</p>
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
