/* eslint-disable max-len */
import React from 'react';

import { Title } from '../components/UI';

export default {
  presentation: (
    <>
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
        18<sup>ème</sup> édition
      </span>{' '}
      ! D'une simple salle d'examen de l'UTT à environ 1500m² au cœur du Festival des Jeux, l'UTT Arena a évolué de
      manière à proposer chaque année des tournois de meilleure qualité à ses joueurs ! Cette année, L'UTT Arena se
      déroule exceptionnellement à distance, dans un tout nouveau format. L'occasion aussi de s'ouvrir encore plus à
      l'international.
      <br />
      <br />À présent l'UTT Arena c'est <span className="accent">450 joueurs</span>,{' '}
      <span className="accent">6 tournois spotlights</span>, des <span className="accent">prix à gagner</span> et des
      tournois <span className="accent">commentés en direct par les casteurs </span>! Et tout cela, c'est grâce à vous,
      les joueurs, coachs, simples curieux… qui nous faites confiance chaque année pour organiser cet événement dans
      l'ambiance qu'on lui connaît ! La confiance de nos partenaires et leur mobilisation autour de notre événement
      contribuent à le rendre exceptionnel ! Un grand merci également à tous les bénévoles qui rendent possible
      l'organisation de ce beau projet.
    </>
  ),
  tickets: (
    <>
      Ouverture des inscriptions le <span className="accent">VENDREDI 16 OCTOBRE, à 19h30 </span>(heure française) !
      <ul>
        <li>Il faut d'abord cliquer sur le bouton "Inscription" dans la barre de navigation</li>
        <li>Ensuite, choisis ton tournoi, tu seras redirigé vers la plateforme toornament</li>
        <li>Clique sur le bouton "s'inscrire au tournoi"</li>
        <li>Pour les tournois en équipe, il faudra inscrire tous les joueurs en une fois</li>
      </ul>
      Cette année l'inscription à l'UTT Arena est <span className="accent">gratuite</span> !
    </>
  ),
  playersInfo: (
    <>
      <strong className="accent">Rappel : l'âge minimum pour participer au tournoi est de 16 ans révolus.</strong>
      <br />
      <br />

      <Title level={4}>Joueur mineur</Title>
      <p>
        Une autorisation parentale remplie sera demandée lors de l'événement.{' '}
        <a href="https://drive.google.com/uc?export=download&id=1bXRvLE091PCiLjcBSWFVVvcvOY6frhO-">
          Tu peux la télécharger ici.
        </a>
      </p>

      <Title level={4}>Streaming</Title>
      <p>
        Il sera possible de streamer pendant l'événement. N'hésitez pas à taguer l'UTT Arena si vous partagez votre
        stream !
      </p>
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
      {
        type: <>UTT&nbsp;Arena</>,
        ven: '17h - 23h',
        sam: '10h - 18h',
        dim: '10h - 18h',
        key: 'ua',
      },
    ],
  },

  timetableinfo: (
    <p>
      Ces horaires sont donnés à titre indicatif. En dehors des tournois officiels, des animations seront aussi
      proposées.
    </p>
  ),
};
