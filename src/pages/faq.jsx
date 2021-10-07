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
        answer: (
          <>
            Pour participer au tournoi il faut avoir au minimum 15 ans. Tu trouveras plus d'informations à propos
            des joueurs mineurs sur <a href="/information">la page informations</a>. L'autorisation parentale est
            <a href="https://arena.utt.fr/uploads/files/Autorisation_parentale_-_UTT_Arena_2021.pdf">disponible ici</a>.
          </>
        ),
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
            <a href="https://discord.gg/WhxZwKU">Tu peux rejoindre notre discord ici.</a>
          </>
        ),
      },
      {
        question: 'Qui contacter si j’ai des questions avant ou pendant l’UTT Arena ?',
        answer:
          'N’hésite pas à demander aux responsables de ton tournoi si tu as une quelconque question ! Tu peux les identifier en taguant @Staff tournoi [nom du tournoi].',
      },
      {
        question: 'Où puis-je trouver les règlements des tournois (formats, règles, ...) ?',
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
            Ouverture des inscriptions le <span className="accent">vendredi 8 octobre 2021, à 19h00 </span>(heure française) !
            <ol>
              <li>Il faut d'abord cliquer sur le bouton "Connexion" dans la barre de navigation</li>
              <li>Crée ton compte et clique sur le lien envoyé par mail</li>
              <li>Une fois connecté, associe ton compte Discord</li>
              <li>Crée ou rejoins une équipe (le chef d'équipe doit accepter ta demande)</li>
              <li>
                Une fois ton équipe au complet et toutes les places de l'équipe payées, demande à ton chef d'équipe de{' '}
                <strong>verrouiller l'équipe</strong> (n'importe quel membre peut payer pour un ou plusieurs membres de l'équipe)
              </li>
              <li>Le statut de l'équipe devient vert et l'équipe est officiellement inscrite !</li>
            </ol>
          </>
        ),
      },
      {
        question: 'Comment savoir si mon équipe est inscrite ?',
        answer: (
          <>
            Il faut que l'équipe soit complète et que <strong>tous</strong> les joueurs de l'équipe aient payé leur
            place. Le chef d'équipe peut alors <strong>verrouiller l'équipe</strong> pour confirmer la participation
            de l'équipe au tournoi.
            Une fois que l'équipe est verrouillée, le statut dans l'onglet "équipe" devient vert et ton équipe est inscrite.
          </>
        ),
      },
      {
        question: 'Combien coûte la participation à un tournoi ?',
        answer: (
          <>
            <ul>
              <li>20 € en tant que joueur</li>
              <li>12 € en tant que coach, manager ou accompagnateur (pour les mineurs)</li>
              <li>12€ en tant que spectateur</li>
              <li>
                Pour les étudiants des écoles partenaires (réseau UT) :
                15€ en tant que joueur et 10€ en tant que spectateur.
                Pensez à vous inscrire avec votre adresse mail étudiante.
              </li>
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
          "Oui cette année il est possible de payer pour d'autres joueurs. Mais il faut qu'ils aient d'abord créé leur compte sur le site de l'UTT Arena et qu'ils aient rejoint ton équipe.",
      },
      {
        question: "J'ai payé ma place, puis-je encore changer de tournoi ?",
        answer:
          'Oui, la place payée est rattachée à un compte et non à un tournoi. Il est donc possible de changer de tournoi sans payer à nouveau.',
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
