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
      contribuent à le rendre exceptionnel ! Un grand merci également à {/* <Link href="/organisers">
        <a> */}
      <span className="accent">tous les bénévoles</span> {/* </a>
      </Link>{' '} */}
      qui rendent possible l'organisation de ce beau projet.
    </div>

    <Title align="center">Inscriptions</Title>
    <div className="information-section">
      Ouverture des inscriptions le <span className="accent">VENDREDI 8 OCTOBRE, à 19h </span>(heure française) !
      <ul>
        <li>Il faut d'abord cliquer sur le bouton "Connexion" dans la barre de navigation</li>
        <li>Crée ton compte et clique sur le lien envoyé par mail</li>
        <li>Une fois connecté, crée ou rejoins une équipe</li>
        <li>
          Une fois ton équipe au complet et tous les billets de l'équipe payés, demande à ton chef d'équipe de
          verrouiller votre équipe
        </li>
      </ul>
    </div>

    <Title align="center">Infos joueurs</Title>
    <div className="information-section">
      <Title level={4}>Joueurs mineurs</Title>
      <p>
        L'âge minimum pour participer au tournoi est de{' '}
        <strong className="accent">15 ans révolus le jour de l'évènement</strong>.
      </p>

      <Title level={4}>Streaming</Title>
      <p>
        Un formulaire de demande de streaming sera mis à disposition avant l’événement. Tu recevras alors une
        confirmation si tu es autorisé à streamer.
      </p>
    </div>

    <Title align="center">Horaires</Title>
    <div className="information-section">
      <p>
        Vendredi aura lieu un discours d'ouverture, suivi d'une soirée jeux libres pour jouer tous ensemble !
        <br />
        Les horaires des matchs vous seront communiqués sur notre Discord !
      </p>
    </div>
  </div>
);

export default Information;
