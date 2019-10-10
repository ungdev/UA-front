/* eslint-disable max-len */
import React from 'react';

export default [
  {
    title: 'Général',
    entries: [
      {
        question: 'Quand commencent les tournois ?',
        answer: 'Tous les tournois commencent le samedi à 10h.',
      },
      {
        question: 'Quel est l\'âge minimum pour la LAN ?',
        answer: (
          <>
            15 ans. Pour les mineurs, une autorisation parentale ou du responsable légal sera demandée le jour de la LAN.<br />
            <a href="https://drive.google.com/uc?export=download&id=1bXRvLE091PCiLjcBSWFVVvcvOY6frhO-">Vous pouvez la télécharger ici.</a>
          </>
        ),
      },
      {
        question: 'Que dois-je amener pour jouer ?',
        answer: (
          <>
            Amène tout ce dont tu as besoin pour jouer : ordinateur, écran, souris, tapis de souris, casque, multiprise et câble RJ45 de 5m minimum.<br />
            Si tu souhaites louer du matériel pendant l'événement, rends-toi sur la{' '}
            <a href="https://scoup-esport.fr/reservation/" target="_blank" rel="noopener noreferrer">boutique de notre partenaire Scoup eSport</a>.<br />
            Nous vendons également des multiprises et des câbles RJ45 de 5m et 7m.
          </>
        ),
      },
      {
        question: 'Puis-je streamer pendant la LAN ?',
        answer: 'Bien-sûr ! Mais il faudra dans un premier temps se déclarer auprès des organisateurs. De plus, l\'équipe organisatrice se réserve le droit de te refuser de faire du stream.',
      },
      {
        question: 'Où puis-je trouver des joueurs pour mon équipe ?',
        answer: (
          <>
            Sur le discord de l'UTT Arena tu trouveras sûrement d'autres joueurs qui cherchent une équipe.{' '}
            <a href="https://discord.gg/WhxZwKU">Tu peux rejoindre notre discord ici.</a>
          </>
        ),
      },
      {
        question: 'Puis-je jouer à la manette ?',
        answer: 'Oui il est possible de jouer à la manette.',
      },
    ],
  },
  {
    title: 'Inscription',
    entries: [
      {
        question: 'Je ne suis pas joueur, dois-je m\'inscrire à l\'UTT Arena pour profiter des animations de l\'événement ?',
        answer: (
        <>
            Une place à l'UTT Arena donne accès à :
            <ul>
              <li>la zone restreinte réservée aux compétiteurs, coachs, managers et accompagnateurs</li>
              <li>notre buvette</li>
              <li>l'UTT Arena de nuit</li>
            </ul>
            Mais nos animations sur scène et notre stand console sont ouverts à tous les visiteurs du Festival des Jeux !<br />
            <a href="https://web.digitick.com/ext/billetterie5/index.php?site=maisonduboulanger&p=201">Vous pouvez acheter votre place visiteur du Festival des Jeux ici.</a>
          </>
         ),
      },
      {
        question: 'Quelle place doivent acheter les coachs/managers de mon équipe ?',
        answer: 'Les coachs et managers d\'équipes doivent acheter une place coach/manager/accompagnateur.',
      },
      {
        question: 'Quand est-ce que mon équipe est officiellement inscrite dans un tournoi de l\'UTT Arena ?',
        answer: <>Il faut que l'équipe soit complète et que <strong>tous</strong> les joueurs de l'équipe aient payé leur place.</>,
      },
      {
        question: 'Combien coûte la LAN ?',
        answer: (
          <>
            La LAN coûte 20€ pour les joueurs.<br />
            La place coach/manager/accompagnateur est à 12€.<br />
            Pour les joueurs venant d'une Université de Technologie, la place joueur est à 15€
            (réduction effectuée au moment du paiement, pensez à utiliser l'adresse mail de votre école).
          </>
        ),
      },
      {
        question: 'Je me suis inscrit et je n\'ai pas reçu mon mail de confirmation',
        answer: (
          <>
            Si lors de votre inscription votre adresse e-mail est rejetée, cela peut être dû à trois choses:
            <ul>
              <li>On ne peut pas avoir plus d'un compte par mail</li>
              <li>Cet e-mail a été banni. Contactez les organisateurs afin d'en savoir plus.</li>
              <li>Vous vous êtes trompé lors de la saisie de votre adresse mail. Contactez les organisateurs grâce au formulaire de contact.</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    title: 'Paiement',
    entries: [
      {
        question: 'Puis-je payer en espèces ?',
        answer: 'Il sera possible de payer en espèces sur place, mais à tes risques et périls, car il y a de fortes chances que toutes les places soient déjà parties.',
      },
      {
        question: 'Puis-je payer par PayPal ?',
        answer: 'Non, sur le site seul le paiement par carte bancaire est disponible.',
      },
      {
        question: 'Puis-je payer pour toute mon équipe ?',
        answer: 'Oui cette année il est possible de payer pour d\'autres joueurs. Mais il faut qu\'ils aient d\'abord créé leur compte sur le site de l\'UTT Arena.',
      },
      {
        question: 'J\'ai payé ma place, puis-je encore changer de tournoi ?',
        answer: 'Oui, la place payée est rattachée à un compte joueur et pas à un tournoi. Il est donc possible de changer de tournoi sans payer à nouveau',
      },
    ],
  },
  {
    title: 'Tournoi Fortnite',
    entries: [
      {
        question: 'Puis-je jouer à Fortnite sur PS4 ?',
        answer: 'Non, seuls les PC sont autorisés.',
      },
    ],
  },
  {
    title: 'Tournoi Super Smash Bros Ultimate',
    entries: [
      {
        question: 'Dois-je ramener ma console ?',
        answer: 'Nous fournissons tout le matériel pour le tournoi SSBU mais si tu veux amener ta Switch pour jouer en freeplay, n\'hésite pas !',
      },
      {
        question: 'Puis-je ramener mon PC ?',
        answer: 'Non, car vous n\'aurez pas de place pour installer votre setup.',
      },
    ],
  },
];
