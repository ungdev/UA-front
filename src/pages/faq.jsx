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
        answer: 'Pour participer au tournoi il faut avoir au minimum 16 ans.',
      },
      {
        question: 'Puis-je streamer pendant les tournois ?',
        answer:
          'Bien-sûr ! Et tu peux nous tagger sur les réseaux sociaux si tu partages ton stream, ça nous fera plaisir ;)',
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
        question: 'Qui contacter si j’ai des questions pendant l’UTT Arena ?',
        answer: 'N’hésite pas à demander aux responsables de ton tournoi si tu as une quelconque question !',
      },
      {
        question: 'Où puis-je trouver les règlements des tournois ?',
        answer:
          "Tu peux télécharger le règlement du tournoi qui t'intéresse dans l'onglet du tournoi concerné. Il est important de le lire attentivement ! (Ils seront publiés d'ici peu de temps)",
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
            Pour cette année les inscriptions se dérouleront sur la plateforme Toornament. Voilà comment cela se passe :
            <ul>
              <li>Sur le site de l'UTT Arena, clique sur le bouton "Inscription" dans la barre de navigation</li>
              <li>Choisis ton tournoi, tu seras redirigé vers le site de Toornament</li>
              <li>Clique sur le bouton vert "S'inscrire au tournoi"</li>
              <li>
                Pour chaque joueur, il faudra renseigner son nom d'utilisateur Discord (nom d'utilisateur complet, avec
                le tag) afin qu'on puisse te trouver sur notre serveur Discord et te marquer comme "inscrit"
              </li>
              <li>Pour les tournois en équipe, il faudra inscrire tous les joueurs d'un coup</li>
              <li>
                Tous les participants devraient recevoir un mail de confirmation te demandant de bien lire le règlement
                de ton tournoi
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "Quand est-ce que mon équipe est officiellement inscrite dans un tournoi de l'UTT Arena ?",
        answer:
          "À partir du moment où tu as reçu un mail de la part de Toornament c'est que tu es officiellement inscrit. Félicitations !",
      },
      {
        question: 'Combien coûte la participation à un tournoi ?',
        answer: (
          <>
            <strong>A venir...</strong>
          </>
        ),
      },
      {
        question: "Dans combien de tournois puis-je m'inscrire ?",
        answer: 'Les tournois se jouant en simultané, tu ne peux t’inscrire qu’à un seul tournoi.',
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
