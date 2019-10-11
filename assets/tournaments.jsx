import React from 'react';

export default {
  lolpro: {
    title: 'League of Legends (Pro)',
    format: (
      <>
        <div className="tournament-format">16 équipes de 5 joueurs</div>
        <ul>
          <li>Phase 1 : Matches de poules en BO1</li>
          <li>Phase 2 : Arbre à double élimination en BO1 sauf les finales en BO3</li>
        </ul>
      </>
    ),
    rewards: (
      <ul>
        <li>1<sup>ère</sup> équipe : 1700€ + lots</li>
        <li>2<sup>ème</sup> équipe : lots</li>
        <li>3<sup>ème</sup> équipe : lots</li>
      </ul>
    ),
    rules: (
      <p>
        Vous pouvez consulter le règlement sur <a href="/static/rules/lol.pdf" target="_blank">ce lien</a>
      </p>
    ),
  },
  lolamateur: {
    title: 'League of Legends (Amateur)',
    format: (
      <>
        <div className="tournament-format">16 équipes de 5 joueurs</div>
        <ul>
          <li>Phase 1 : Tournoi suisse en BO1</li>
          <li>Phase 2 : Arbre des 4 premier du tournoi suisse en BO3</li>
        </ul>
      </>
    ),
    rewards: (
      <ul>
        <li>1<sup>ère</sup> équipe : lots</li>
        <li>2<sup>ème</sup> équipe : lots</li>
        <li>3<sup>ème</sup> équipe : lots</li>
      </ul>
    ),
    rules: (
      <p>
        Vous pouvez consulter le règlement sur <a href="/static/rules/lol.pdf" target="_blank">ce lien</a>
      </p>
    ),
  },
  ssbu: {
    title: 'Super Smash Bros Ultimate',
    format: (
      <>
        <div className="tournament-format">64 joueurs en solo</div>
        <ul>
          <li>Phase 1 : Phase de poules en BO3</li>
          <li>Phase 2 : Arbre à double élimination en BO3 sauf les finales en BO5</li>
        </ul>
      </>
    ),
    rewards: (
      <ul>
        <li>1<sup>er</sup> : 400€ + lots</li>
        <li>2<sup>ème</sup> : 150€ + lots</li>
        <li>3<sup>ème</sup> : 100€ + lots</li>
      </ul>
    ),
    rules: (
      <p>
        Vous pouvez consulter le règlement sur <a href="/static/rules/ssbu.pdf" target="_blank">ce lien</a>
      </p>
    ),
  },
  csgo: {
    title: 'Counter-Strike : Global Offensive',
    format: (
      <>
        <div className="tournament-format">16 équipes de 5 joueurs</div>
        <ul>
          <li>Phase 1 : Format double élimination en BO1</li>
          <li>Phase 2 : Demi-finale en BO1</li>
          <li>Phase 3 : Finale en BO3</li>
        </ul>
      </>
    ),
    rewards: (
      <ul>
        <li>1<sup>ère</sup> équipe : 1450€ + lots</li>
        <li>2<sup>ème</sup> équipe : lots</li>
        <li>3<sup>ème</sup> équipe : lots</li>
      </ul>
    ),
    rules: (
      <p>
        Vous pouvez consulter le règlement sur <a href="/static/rules/csgo.pdf" target="_blank">ce lien</a>
      </p>
    ),
  },
  fortnite: {
    title: 'Fortnite',
    format: (
      <>
        <div className="tournament-format">24 équipes en squad</div>
        <p>Description du tournoi à venir.</p>
      </>
    ),
    rewards: (
      <ul>
        <li>1<sup>ère</sup> équipe : 1200€ + lots</li>
        <li>2<sup>ème</sup> équipe : lots</li>
        <li>3<sup>ème</sup> équipe : lots</li>
      </ul>
    ),
    rules: (
      <p>
        Vous pouvez consulter le règlement sur <a href="/static/rules/fortnite.pdf" target="_blank">ce lien</a>
      </p>
    ),
  },
  osu: {
    title: 'osu!',
    format: (
      <>
        <div className="tournament-format">24 joueurs</div>
        <p>Description du tournoi à venir.</p>
      </>
    ),
    rules: 'Le règlement sera bientôt publié.',
  },
  libre: {
    title: 'Libre',
    format: (
      <>
        <div className="tournament-format">24 joueurs</div>
        <p>Description du tournoi à venir.</p>
      </>
    ),
    rules: 'Le règlement sera bientôt publié.',
  },
};
