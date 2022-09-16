import React from 'react';
// import { uploadsUrl } from './environment';

const tournaments = [
  {
    name: 'League of Legends',
    shortName: 'lol',
    players: 160,
    teamCount: 32,
    image: '/tournaments/lol.jpg',
    shortRewards: 'À venir',
    rewards: <>À venir</>,
    casters: <>À venir</>,
    // (
    //   <ul>
    //     <li>
    //       1<sup>ère</sup> place : lots
    //     </li>
    //     <li>
    //       2<sup>ème</sup> place : lots
    //     </li>
    //     <li>
    //       3<sup>ème</sup> place : lots
    //     </li>
    //   </ul>
    // ),
    // toornamentId: '5045525084995133440',
    format: (
      <>
        32 équipes de 5 joueurs
        {/* <br />
        <br />
        Ce tournoi n'est ni affilié ni sponsorisé par Riot Games, Inc. ou League of Legends Esports. */}
      </>
    ),
    // rules: `${uploadsUrl()}/rules/lol.pdf`,
  },
  {
    name: 'Super Smash Bros. Ultimate',
    shortName: 'ssbu',
    players: 128,
    image: '/tournaments/ssbu.jpg',
    shortRewards: 'À venir',
    rewards: <>À venir</>,
    casters: <>À venir</>,
    // (
    //   <ul>
    //     <li>
    //       1<sup>ère</sup> place : 375€
    //     </li>
    //     <li>
    //       2<sup>ème</sup> place : 175€
    //     </li>
    //     <li>
    //       3<sup>ème</sup> place : 100€
    //     </li>
    //   </ul>
    // ),
    // toornamentId: '5045512183706099712',
    format: <>128 joueurs</>,
    // rules: `${uploadsUrl()}/rules/ssbu.pdf`,
  },
  {
    name: 'Counter-Strike: Global Offensive',
    shortName: 'csgo',
    players: 80,
    teamCount: 16,
    image: '/tournaments/csgo.jpg',
    shortRewards: 'À venir',
    rewards: <>À venir</>,
    casters: <>À venir</>,
    // (
    //   <ul>
    //     <li>
    //       1<sup>ère</sup> place : 925€
    //     </li>
    //     <li>
    //       2<sup>ème</sup> place : 450€
    //     </li>
    //     <li>
    //       3<sup>ème</sup> place : 225€
    //     </li>
    //   </ul>
    // ),
    // toornamentId: '5045528654683340800',
    format: <>16 équipes de 5 joueurs</>,
    // rules: `${uploadsUrl()}/rules/csgo.pdf`,
  },
  {
    name: 'Valorant',
    shortName: 'Valorant',
    players: 80,
    teamCount: 16,
    image: '/tournaments/valorant.jpg',
    shortRewards: 'À venir',
    rewards: <>À venir</>,
    casters: <>À venir</>,
    // (
    //   <ul>
    //     <li>
    //       1<sup>ère</sup> place : 925€ + lots
    //     </li>
    //     <li>
    //       2<sup>ème</sup> place : 450€ + lots
    //     </li>
    //     <li>
    //       3<sup>ème</sup> place : 225€ + lots
    //     </li>
    //   </ul>
    // ),
    format: <>16 équipes de 5 joueurs</>,
    // rules: `${uploadsUrl()}/rules/lol-competitive.pdf`,
  },
  {
    name: 'Rocket League',
    shortName: 'rl',
    players: 48,
    teamCount: 16,
    image: '/tournaments/rocket-league.jpg',
    shortRewards: 'À venir',
    rewards: <>À venir</>,
    casters: <>À venir</>,
    // (
    //   <ul>
    //     <li>
    //       1<sup>ère</sup> place : 705€
    //     </li>
    //     <li>
    //       2<sup>ème</sup> place : 345€
    //     </li>
    //     <li>
    //       3<sup>ème</sup> place : 150€
    //     </li>
    //   </ul>
    // ),
    // toornamentId: '4958829017709346816',
    format: <>16 équipes de 3 joueurs</>,
    // rules: `${uploadsUrl()}/rules/rocket-league.pdf`,
  },
  {
    name: 'osu!',
    shortName: 'osu',
    players: 48,
    image: '/tournaments/osu.jpg',
    shortRewards: 'À venir',
    rewards: <>À venir</>,
    casters: <>À venir</>,
    //  (
    //   <ul>
    //     <li>
    //       1<sup>ère</sup> place : 150€
    //     </li>
    //     <li>
    //       2<sup>ème</sup> place : 75€
    //     </li>
    //     <li>
    //       3<sup>ème</sup> place : 45€
    //     </li>
    //     <li>
    //       4<sup>ème</sup> place : 30€
    //     </li>
    //   </ul>
    // ),
    // toornamentId: null,
    format: (
      <>
        48 joueurs
        {/* qualifiés.{' '}
        <a href="https://osu.ppy.sh/community/forums/topics/1409204">Inscription aux qualifications ici.</a> */}
      </>
    ),
    // rules: `https://osu.ppy.sh/community/forums/topics/1409204`,
  },
  {
    name: 'Teamfight Tactics',
    shortName: 'tft',
    players: 32,
    image: '/tournaments/tft.jpg',
    shortRewards: 'À venir',
    rewards: <>À venir</>,
    // (
    //   <ul>
    //     <li>
    //       1<sup>ère</sup> place : 925€ + lots
    //     </li>
    //     <li>
    //       2<sup>ème</sup> place : 450€ + lots
    //     </li>
    //     <li>
    //       3<sup>ème</sup> place : 225€ + lots
    //     </li>
    //   </ul>
    // ),
    format: <>32 joueurs</>,
    // rules: `${uploadsUrl()}/rules/lol-competitive.pdf`,
  },
  {
    name: 'Libre',
    shortName: 'open',
    players: 56,
    image: '/tournaments/open.jpg',
    shortRewards: 'À venir',
    rewards: <>À venir</>,
    // (
    //   <ul>
    //     <li>
    //       1<sup>ère</sup> place : lots
    //     </li>
    //     <li>
    //       2<sup>ème</sup> place : lots
    //     </li>
    //     <li>
    //       3<sup>ème</sup> place : lots
    //     </li>
    //   </ul>
    // ),
    // toornamentId: null,
    format: <>56 joueurs</>,
    // rules: `${uploadsUrl()}/rules/open.pdf`,
  },
];

export default tournaments;
