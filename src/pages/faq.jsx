import React from 'react';

import { Title, Collapse } from '../components/UI';

const content = [
  {
    title: 'Général',
    entries: [
      {
        question: 'Quand commencent les tournois ?',
        answer: 'Les tournois commencent le samedi à 10h.',
      },
      {
        question: "Quel est l'âge minimum pour participer aux tournois ?",
        answer: 'Pour participer au tournoi il faut avoir au minimum 15 ans.',
      },
      {
        question: 'Puis-je streamer pendant les tournois ?',
        answer: (
          <>
            Un formulaire de demande de streaming est <a href="https://forms.gle/K3AbKdtb6Nvp3NQ7A">disponible ici</a>.
            Tu recevras alors une confirmation une semaine avant l'événement si tu es autorisé à streamer.
          </>
        ),
      },
      {
        question: 'Où puis-je trouver des joueurs pour monter une équipe ?',
        answer: (
          <>
            Sur le discord de l'UTT Arena tu trouveras sûrement d'autres joueurs qui cherchent une équipe.{' '}
            <a href="https://discord.gg/WhxZwKU" target="_blank" rel="noopener noreferrer">
              Tu peux rejoindre notre discord ici.
            </a>
          </>
        ),
      },
      {
        question: 'Qui contacter si j’ai des questions avant ou pendant l’UTT Arena ?',
        answer:
          'N’hésite pas à demander aux responsables de ton tournoi si tu as une quelconque question ! Tu peux les identifier en taguant @Staff tournoi [nom du tournoi].',
      },
      {
        question: 'Où puis-je trouver les règlements des tournois ?',
        answer:
          "Tu peux télécharger le règlement du tournoi qui t'intéresse dans l'onglet du tournoi concerné. Il est important de le lire attentivement !",
      },
    ],
  },
  {
    title: 'Situation sanitaire',
    entries: [
      {
        question: 'Le pass sanitaire sera-t-il requis ?',
        answer: 'Cela dépendra des annonces gouvernentales à venir.',
      },
      {
        question: 'Le port du masque sera-t-il obligatoire ?',
        answer: 'Cela dépendra des annonces gouvernentales à venir.',
      },
    ],
  },
  {
    title: 'Inscription',
    entries: [
      {
        question: 'Comment se passent les inscriptions ?',
        answer: (
          <>
            Ouverture des inscriptions le <span className="accent">VENDREDI 8 OCTOBRE, à 19h </span>(heure française) !
            <ul>
              <li>Il faut d'abord cliquer sur le bouton "Connexion" dans la barre de navigation</li>
              <li>Crée ton compte et clique sur le lien envoyé par mail</li>
              <li>Une fois connecté, crée ou rejoins une équipe</li>
              <li>
                Une fois ton équipe au complet et tous les billets de l'équipe payés, demande à ton chef d'équipe de
                verrouiller l'équipe
              </li>
            </ul>
          </>
        ),
      },
      {
        question: 'Quelle place doivent acheter les coachs/managers de mon équipe ?',
        answer: "Les coachs et managers d'équipes doivent acheter une place coach/manager/accompagnateur.",
      },
      {
        question: "Quand est-ce que mon équipe est officiellement inscrite dans un tournoi de l'UTT Arena ?",
        answer: (
          <>
            Il faut que l'équipe soit complète et que <strong>tous</strong> les joueurs de l'équipe aient payé leur
            place. Le chef d'équipe peut alors verrouiller l'équipe pour confirmer la participation de l'équipe au
            tournoi.
          </>
        ),
      },
      {
        question: 'Combien coûte la participation à un tournoi ?',
        answer: (
          <>
            <ul>
              <li>20 € par défaut</li>
              <li>15 € pour les étudiants des écoles partenaires (réseau UT)</li>
              <li>12 € pour les coachs, managers et accompagnateurs</li>
            </ul>
          </>
        ),
      },
      {
        question: "Dans combien de tournois puis-je m'inscrire ?",
        answer: 'Les tournois se jouant en simultané, tu ne peux t’inscrire qu’à un seul tournoi.',
      },
    ],
  },
  {
    title: 'Paiement',
    entries: [
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
          "Oui cette année il est possible de payer pour d'autres joueurs. Mais il faut qu'ils aient d'abord créé leur compte sur le site de l'UTT Arena.",
      },
      {
        question: "J'ai payé ma place, puis-je encore changer de tournoi ?",
        answer:
          'Oui, la place payée est rattachée à un compte joueur et pas à un tournoi. Il est donc possible de changer de tournoi sans payer à nouveau.',
      },
    ],
  },
  {
    title: 'Tournoi Super Smash Bros Ultimate',
    entries: [
      {
        question: 'Dois-je ramener ma console ?',
        answer: (
          <>
            Si tu as coché la case "Je ramène ma console" à l'inscription au tournoi, tu dois en effet ramener ta
            Switch, et tu bénéficies d'une réduction sur le prix de ton billet. Cette option est disponible pour les
            plus rapides seulement.
            <br />
            Même sans cocher cette case, tu peux ramener ta console pour jouer en freeplay.
          </>
        ),
      },
      {
        question: 'Puis-je ramener mon PC ?',
        answer: "Non, car tu n'auras pas de place pour installer ton setup.",
      },
      {
        question: 'Dois-je ramener mes manettes ?',
        answer:
          "Oui. Tu dois ramener tes manettes de Switch ou ta manette de GameCube en n'oubliant pas ton adaptateur.",
      },
    ],
  },
];

const FAQ = () => (
  <div id="faq">
    <Title align="center">FAQ</Title>

    {content.map((category) => (
      <div key={category.title} className="faq-category">
        <Title level={3}>{category.title}</Title>

        {category.entries.map((entry, i) => (
          <Collapse key={`${category.title}-${i}`} title={entry.question}>
            {entry.answer}
          </Collapse>
        ))}
      </div>
    ))}
  </div>
);

export default FAQ;
