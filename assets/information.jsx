/* eslint-disable max-len */
import React from 'react';

import { Title } from '../components';

export default {
  presentation: (
    <>
      L'<span className="main-color">UTT Arena</span> c'est le plus gros événement de l'association <span className="main-color">UTT Net Group</span> en matière d'e-sport.
      L'association a été créée en 1998 et a pour but de réunir les passionnés d'informatique et des nouvelles technologies de l'Université de Technologie de Troyes (UTT).<br />
      L'UTT Arena réalise sa <span className="main-color">17<sup>ème</sup> édition</span> cette année ! Au commencement, lors de la première édition, nous étions dans une salle d'examen de l'UTT avec une centaine de joueurs.<br />
      Puis l'événement a grandi, l'organisation a augmenté à 200 joueurs avec une scène dans la halle sportive de l'UTT.<br />
      L'année 2015 est arrivée et une opportunité unique nous a été offerte par la ville avec la création du Festival des Jeux.
      Nous avons donc déménagé au Cube et nous sommes depuis dans le format que vous connaissez !<br />
      À présent l'UTT Arena c'est <span className="main-color">460 joueurs</span>, <span className="main-color">5 tournois spotlights</span>, une scène de 70 m² et une centaine de bénévoles.<br /><br />
      Et tout cela, c'est grâce à vous, les joueurs, qui nous faites confiance chaque année pour vous organiser un événement de folie, et à nos partenaires qui nous soutiennent chaque année dans l'organisation de la LAN !
    </>
  ),
  tickets: (
    <>
      Il sera possible d'acheter une place à partir du dimanche 13 octobre.
      <ul>
        <li>Il faut d'abord s'inscrire (bouton "Connexion" dans la barre de navigation)</li>
        <li>Ensuite, il faut payer sa place</li>
        <li>Cette année, le paiement groupé est possible</li>
        <li>Le paiement se fait uniquement par carte bancaire sur le site</li>
      </ul>

      Les tarifs sont les suivants :
      <ul>
        <li>Joueur : 20€</li>
        <li>Accompagnateur : 12€ (limité à 40 places)</li>
      </ul>
    </>
  ),
  playersInfo: (
    <>
      <strong>Rappel : l'âge minimum pour participer au tournoi est de 15 ans.</strong><br />
      <p>Pour les mineurs, une <strong>autorisation parentale</strong> sera demandée lors de l'événement (elle sera bientôt disponible au téléchargement).</p>

      <Title level={4}>Ce qu'il faut apporter</Title>
      <ul>
        <li>Ton PC</li>
        <li>Ton casque</li>
        <li>Une multiprise</li>
        <li>Un câble ethernet</li>
      </ul>
      <p>Nous vendons des multiprises et des câbles RJ45 de 5m et 7m.</p>

      <Title level={4}>Ce qui est fourni</Title>
      <ul>
        <li>Une place assise évidemment</li>
        <li>Un port ethernet</li>
        <li>Une prise électrique</li>
      </ul>

      <Title level={4}>Streaming</Title>
      <p>
        Pour les joueurs souhaitant streamer pendant la LAN, il faudra en faire la demande au moins 2 semaines avant l'événement.
        Nous nous réservons le droit d'empêcher le stream.
      </p>
    </>
  ),
  services: (
    <>
      <Title level={4}>Nourriture</Title>
      <p>
        On sait qu'un weekend de 48h non-stop ça creuse, nous te proposerons donc sur place :
        croque-monsieur, crêpes, pizzas, canettes, snack, tout pour te sustenter au mieux !
        Et tout cela à un prix abordable.
      </p>

      <Title level={4}>Couchage</Title>
      <p>
        Nous mettons à disposition des joueurs des loges communes avec un accès à l'eau et aux douches !
        Pensez à ramener vos duvets si vous souhaitez en profiter ! Nous mettrons à disposition des tapis pour plus de confort.
      </p>

      <Title level={4}>Location de matériel</Title>
      <p>
        Grâce à notre partenaire Scoup eSport, nous vous proposons de louer du matériel gaming pour toute la durée de l'événement.
        Pour cela, choisissez votre matériel dans votre dashboard après avoir payé votre place et vous pourrez le récupérer à partir du vendredi.
      </p>
    </>
  ),
  access: (
    <>
      <p><strong>Adresse :</strong> UTT Arena, 20 rue des Gayettes, 10000 Troyes</p>

      <div className="access">
        <div>
          <iframe
            height="320"
            width="100%"
            title="Google Maps"
            src="https://maps.google.com/maps?q=UTT+Arena&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          />
        </div>

        <div>
          <Title level={4}>Parking</Title>
          <p>Parking gratuit mis à disposition juste en face du Parc des Expositions</p>

          <Title level={4}>Train</Title>
          <p>Gare de Troyes à 10 min à pied du festival</p>

          <Title level={4}>Bus</Title>
          <p>Lignes 2, 6, 8 : arrêt Terrasses ou Ligne 5 : arrêt CCI</p>
        </div>
      </div>
    </>
  ),
  timetable: {
    columns: [
      { title: '', key: 'type' },
      { title: <>Vendredi&nbsp;6</>, key: 'ven' },
      { title: <>Samedi&nbsp;7</>, key: 'sam' },
      { title: <>Dimanche&nbsp;8</>, key: 'dim' },
    ],
    rows: [
      { type: <>UTT&nbsp;Arena</>, ven: '17h - 00h', sam: '00h - 00h', dim: '00h - 18h' },
      { type: <>Festival&nbsp;des&nbsp;jeux</>, ven: '17h - 21h', sam: '11h - 22h', dim: '11h - 18h' },
    ],
  },
};