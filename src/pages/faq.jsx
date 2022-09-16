import React from 'react';

import { Title, Collapse } from '../components/UI';

const content = [
  {
    title: 'Général',
    entries: [
      {
        question: 'Quand commencent les tournois ?',
        answer:
          'Les tournois commencent le samedi à 10h mais les participants des tournois devront être présents le samedi à 9h pour effectuer un check-in.',
      },
      {
        question: "Quel est l'âge minimum pour participer aux tournois ?",
        answer: (
          <>
            Pour participer au tournoi il faut avoir au minimum <strong>15 ans lors de l'événement</strong>. Il faudra
            que tu présentes l'autorisation parentale
            {/*(
            <strong>
              Mise
              <a href="https://arena.utt.fr/uploads/files/Autorisation_parentale_-_UTT_Arena_2021.pdf">
                disponible ici
            </a>
            </strong>
            )*/}
            , fournie lors de l’inscription,{' '}
            <strong>ainsi qu'une photocopie de la pièce d'identité de ton responsable légal et de la tienne</strong>{' '}
            avant d'accéder à l'UTT Arena.
          </>
        ),
      },
      {
        question: 'Puis-je streamer pendant les tournois ?',
        answer: (
          <>
            {/*Seulement si tu as reçu un mail t'en donnant l'autorisation suite à ta demande. Un formulaire de demande de
            streaming est{' '}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdBJk9aVHftYELBDcN-E2qDQJejY0O6JWT3sTEQp6rtrnP8Jw/viewform">
              disponible ici
            </a>
        .*/}
            Un formulaire sera mis à disposition lors des inscriptions afin de faire ta demande auprès de l’équipe de
            l’UTT Arena. L’équipe de l’UTT Arena se réserve le droit d’accepter ou refuser ta demande, et toute personne
            faisant du streaming sans autorisation validée par l’équipe se verra sanctionnée.
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
          'N’hésite pas à demander aux responsables de ton tournoi si tu as une quelconque question ! Tu peux les identifier en taguant @Staff tournoi [nom du tournoi] sur le Discord de l’UTT Arena.',
      },
      {
        question: 'Où puis-je trouver les règlements des tournois (formats, règles, ...) ?',
        answer:
          "Les règlements sont encore en cours d'écriture. Tu pourras télécharger le règlement du tournoi qui t'intéresse dans l'onglet du tournoi concerné. Il est important de le lire attentivement !",
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
            Ouverture des inscriptions <span className="accent">à venir</span> !
            <ol>
              <li>Il faut d'abord cliquer sur le bouton "Connexion" dans la barre de navigation</li>
              <li>Crée ton compte et clique sur le lien envoyé par mail</li>
              <li>Une fois connecté, associe ton compte Discord</li>
              <li>Crée ou rejoins une équipe (le chef d'équipe doit accepter ta demande)</li>
              <li>
                Une fois ton équipe au complet et toutes les places de l'équipe payées, demande à ton chef d'équipe de{' '}
                <strong>verrouiller l'équipe</strong> (n'importe quel membre peut payer pour un ou plusieurs membres de
                l'équipe)
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
            place. Le chef d'équipe peut alors <strong>verrouiller l'équipe</strong> pour confirmer la participation de
            l'équipe au tournoi. Une fois que l'équipe est verrouillée, le statut dans l'onglet "équipe" devient vert et
            ton équipe est inscrite.
          </>
        ),
      },
      {
        question: 'Combien coûte la participation à un tournoi ?',
        answer: (
          <>
            <ul>
              <li>22 € pour les joueurs du tournoi Super Smash Bros Ultimate</li>
              <li>25 € pour les joueurs des autres tournois</li>
              <li>15 € en tant que coach, manager ou accompagnateur (pour les mineurs)</li>
              <li>15 € en tant que spectateur</li>
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
          'Oui, la place payée est rattachée à un compte et non à un tournoi. Il est donc possible de changer de tournoi sans payer à nouveau, sauf pour le tournoi Super Smash Bros Ultimate.',
      },
    ],
  },
  {
    title: 'Tournoi Super Smash Bros Ultimate',
    entries: [
      {
        question: 'Dois-je apporter ma console ?',
        answer: (
          <>
            Si tu as coché la case <strong>"Réduction si tu amènes ta propre Nintendo Switch"</strong> à l'inscription
            au tournoi, tu dois en effet apporter ta , le jeu SSBU avec <strong>tous</strong> les personnages et un
            câble HDMI, et tu bénéficies d'une <strong>réduction</strong> de 3€ sur le prix de ton billet. Cette option
            est disponible pour les plus rapides seulement.
            <br />
            Même sans cocher cette case, tu peux apporter ta console pour jouer en freeplay.
            <br />
            <br />
            <strong>
              Si tu as indiqué que tu apportais ta console et que ce n'est pas le cas, un supplément de 6€ te sera
              facturé sur place.
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
        answer:
          "Oui. Tu dois apporter tes manettes de Switch ou ta manette de GameCube en n'oubliant pas ton adaptateur.",
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
