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
    </div>

    <Title align="center">Inscriptions</Title>
    <div className="information-section">
      Ouverture des inscriptions le <span className="accent">VENDREDI 16 OCTOBRE, à 19h30 </span>(heure française) !
      Elles auront lieu sur la plateforme Toornament mais pas de panique, tout est expliqué ici.
      <ul>
        <li>Il faut d'abord cliquer sur le bouton "Inscription" dans la barre de navigation</li>
        <li>Ensuite, choisis ton tournoi, tu seras redirigé vers la plateforme Toornament</li>
        <li>Clique sur le bouton "s'inscrire au tournoi"</li>
        <li>Pour les tournois en équipe, il faudra inscrire tous les joueurs en une fois</li>
      </ul>
      Cette année l'inscription à l'UTT Arena est <span className="accent">gratuite</span> !
    </div>

    <Title align="center">Infos joueurs</Title>
    <div className="information-section">
      <Title level={4}>Joueurs mineurs</Title>
      <p>
        L'âge minimum pour participer au tournoi est de <strong className="accent">16 ans révolus</strong>.
      </p>

      <Title level={4}>Streaming</Title>
      <p>
        Il sera possible de streamer pendant l'événement. N'hésitez pas à taguer l'UTT Arena si vous partagez votre
        stream !
      </p>
    </div>

    <Title align="center">Horaires</Title>
    <div className="information-section">
      <Table
        columns={[
          { title: '', key: 'type' },
          { title: <>Vendredi&nbsp;6</>, key: 'ven' },
          { title: <>Samedi&nbsp;7</>, key: 'sam' },
          { title: <>Dimanche&nbsp;8</>, key: 'dim' },
        ]}
        dataSource={[
          {
            type: <>UTT&nbsp;Arena</>,
            ven: '17h - 23h',
            sam: '10h - 18h',
            dim: '10h - 18h',
            key: 'ua',
          },
        ]}
        className="timetable"
      />
      <p>
        Ces horaires sont donnés à titre indicatif. En dehors des tournois officiels, des animations vous seront
        proposées pour vous offrir une ambiance en continu en journée !
      </p>
    </div>
  </div>
);

export default Information;
