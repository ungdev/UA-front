import Link from 'next/link';
import React from 'react';

import { Title, Table } from '../components/UI';

const Information = () => (
  <div id="information">
    <Title align="center">Présentation</Title>
    <div className="information-section">
      L'<span className="accent">UTT Arena</span> (UA) est le plus gros événement de l'association{' '}
      <span className="accent">
        <a href="https://ung.utt.fr">UTT Net Group</a>
      </span>{' '}
      (UNG). L'UNG a été créée en 1998 pour rassembler tous les passionnés d'informatique et des nouvelles technologies
      de l'Université de Technologie de Troyes (UTT).
      <br />
      <br />
      L'UTT Arena revient cette année pour sa{' '}
      <span className="accent">
        19<sup>ème</sup> édition
      </span>{' '}
      ! D'une simple salle d'examen de l'UTT à 2000m² de gaming à l'espace Argence, en passant par le festival des jeux,
      l'UTT Arena a évolué de manière à proposer chaque année des tournois de meilleure qualité à ses joueurs !
      <br />
      <br />À présent l'UTT Arena c'est <span className="accent">450 joueurs</span>,{' '}
      <span className="accent">5 tournois spotlights</span>, des <span className="accent">prix à gagner</span> et des
      tournois <span className="accent">commentés en direct par les casteurs </span>! Et tout cela, c'est grâce à vous,
      les joueurs, coachs, simples curieux… qui nous faites confiance chaque année pour organiser cet événement dans
      l'ambiance qu'on lui connaît ! La confiance de nos partenaires et leur mobilisation autour de notre événement
      contribuent à le rendre exceptionnel ! Un grand merci également à{' '}
      {/* <Link href="/organisers">
        <a> */}
      <span className="accent">tous les bénévoles</span>{' '}
      {/* </a>
      </Link>{' '} */}
      qui rendent possible l'organisation de ce beau projet.
    </div>

    <Title align="center">Inscriptions</Title>
    <div className="information-section">
      Ouverture des inscriptions le <span className="accent">vendredi 8 octobre 2021, à 19h00 </span>(heure française) !
      <ul>
        <li>Il faut d'abord cliquer sur le bouton "Connexion" dans la barre de navigation</li>
        <li>Crée ton compte et clique sur le lien envoyé par mail</li>
        <li>Une fois connecté, associe ton compte Discord</li>
        <li>Crée ou rejoins une équipe (le chef d'équipe doit accepter ta demande)</li>
        <li>
          Une fois ton équipe au complet et toutes les places de l'équipe payées, demande à ton chef d'équipe de{' '}
          <strong>verrouiller l'équipe</strong> (n'importe quel membre peut payer pour un ou plusieurs membres de l'équipe)
        </li>
        <li>Le statut de l'équipe devient vert et l'équipe est officiellement inscrite !</li>
      </ul>
    </div>

    <Title align="center">Infos joueurs</Title>
    <div className="information-section">
      <Title level={4}>Joueurs mineurs</Title>
      <p>
        L'âge minimum pour participer au tournoi est de{' '}
        <strong className="accent">15 ans le jour de l'évènement</strong>.
      </p>
      <p>
        Pour tous les joueurs mineurs, l'<strong>autorisation parentale</strong> sera demandée avant de rentrer dans l'UTT Arena.{' '}
        <strong>Elle est <a href="https://arena.utt.fr/uploads/files/Autorisation_parentale_-_UTT_Arena_2021.pdf">disponible ici</a>.</strong>
      </p>

      <Title level={4}>Streaming</Title>
      <p>
        Un formulaire de demande de streaming est <a href="https://forms.gle/K3AbKdtb6Nvp3NQ7A">disponible ici</a>.
        Tu recevras alors une confirmation une semaine avant l'événement si tu es autorisé à streamer.
      </p>
    </div>

    <Title align="center">Horaires</Title>
    <div className="information-section">
      <p>
        Vendredi aura lieu un discours d'ouverture, suivi d'une soirée jeux libres pour jouer tous ensemble !
        <br />
        Les horaires des matchs te seront communiqués sur notre Discord !
      </p>
    </div>

    <Title align="center">Emplacement</Title>
    <div className="information-section">
      <p>
        <a href="https://www.google.com/maps/place/UTT+Arena/@48.300153,4.0699859,17z/data=!3m1!4b1!4m5!3m4!1s0x47ee985568e4c74b:0x5a667248e9ced9f0!8m2!3d48.2998563!4d4.0724229">
          20 bis Bd Gambetta, 10000 Troyes
        </a>
      </p>
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
  </div>
);

export default Information;
