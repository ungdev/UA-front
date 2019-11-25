import React from 'react';

export default {
  lolpro: {
    image: '/static/lolpro.png',
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
    rules: `${process.env.ARENA_API_URI}uploads/rules/lol.pdf`,
  },
  lolamateur: {
    image: '/static/lolamateur.png',
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
    rules: `${process.env.ARENA_API_URI}uploads/rules/lol.pdf`,
  },
  ssbu: {
    image: '/static/ssbu.png',
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
    rules: `${process.env.ARENA_API_URI}uploads/rules/ssbu.pdf`,
  },
  csgo: {
    image: '/static/csgo.png',
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
    rules: `${process.env.ARENA_API_URI}uploads/rules/csgo.pdf`,
  },
  fortnite: {
    image: '/static/fortnite.png',
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
    rules: `${process.env.ARENA_API_URI}uploads/rules/fortnite.pdf`,
  },
  osu: {
    image: '/static/osu.png',
    title: 'osu!',
    format: (
      <>
        <div className="tournament-format">24 joueurs</div>
        <p>Description du tournoi disponible <a href="https://osu.ppy.sh/community/forums/topics/972130">ici</a>.</p>
      </>
    ),
    rules: 'https://osu.ppy.sh/community/forums/topics/972130',
  },
  libre: {
    image: '/static/libre.png',
    title: 'Libre',
    format: (
      <>
        <div className="tournament-format">24 joueurs</div>
        <p>
        Le tournoi libre se déroulera sur plusieurs jeux tout au long du week-end, il se veut avant tout fun et permettra aux joueurs de montrer leur skill sur différents jeux, pour voir lequel des participants est le plus polyvalent.
        Les différents jeux seront <strong>Mario Kart</strong>, <strong>Super Smash Bros</strong>, <strong>Tricky Towers</strong>, <strong>Worms</strong> et encore plusieurs autres, on aura même à disposition un casque VR pour jouer à <strong>Beat Saber</strong>.
        De plus n’hésitez à nous proposer des idées pour des jeux que vous aimeriez voir apparaitre dans le tournoi.
        Alors si tu crois pouvoir battre tout le monde sur tes jeux préférés, n’hésite pas et inscris-toi.
        </p>
      </>
    ) },
};
