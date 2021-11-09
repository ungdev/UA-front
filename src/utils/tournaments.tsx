import React from 'react';
import { uploadsUrl } from './environment';

export default [
  {
    name: 'League of Legends compétitif',
    shortName: 'lolCompetitive',
    players: 80,
    image: '/tournaments/lol-competitive.jpg',
    shortRewards: '1600€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 925€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 450€ + lots
        </li>
        <li>
          3<sup>ème</sup> place : 225€ + lots
        </li>
      </ul>
    ),
    toornamentId: '5045521366727811072',
    format: (
      <>
        16 équipes de 5 joueurs.
        <br />
        <br />
        Ce tournoi n'est ni affilié ni sponsorisé par Riot Games, Inc. ou League of Legends Esports.
      </>
    ),
    rules: `${uploadsUrl()}/rules/lol-competitive.pdf`,
  },
  {
    name: 'League of Legends loisir',
    shortName: 'lolLeisure',
    players: 80,
    image: '/tournaments/lol-leisure.jpg',
    shortRewards: 'lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : lots
        </li>
        <li>
          2<sup>ème</sup> place : lots
        </li>
        <li>
          3<sup>ème</sup> place : lots
        </li>
      </ul>
    ),
    toornamentId: '5045525084995133440',
    format: (
      <>
        16 équipes de 5 joueurs.
        <br />
        <br />
        Ce tournoi n'est ni affilié ni sponsorisé par Riot Games, Inc. ou League of Legends Esports.
      </>
    ),
    rules: `${uploadsUrl()}/rules/lol-leisure.pdf`,
  },
  {
    name: 'Rocket League',
    shortName: 'rl',
    players: 48,
    image: '/tournaments/rocket-league.jpg',
    shortRewards: '1200€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 705€
        </li>
        <li>
          2<sup>ème</sup> place : 345€
        </li>
        <li>
          3<sup>ème</sup> place : 150€
        </li>
      </ul>
    ),
    toornamentId: '4958829017709346816',
    format: '16 équipes de 3 joueurs',
    rules: `${uploadsUrl()}/rules/rocket-league.pdf`,
  },
  {
    name: 'Counter-Strike: Global Offensive',
    shortName: 'csgo',
    players: 120,
    image: '/tournaments/csgo.jpg',
    shortRewards: '1600€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 925€
        </li>
        <li>
          2<sup>ème</sup> place : 450€
        </li>
        <li>
          3<sup>ème</sup> place : 225€
        </li>
      </ul>
    ),
    toornamentId: '5045528654683340800',
    format: '24 équipes de 5 joueurs',
    rules: `${uploadsUrl()}/rules/csgo.pdf`,
  },
  {
    name: 'SSBU by Murex',
    shortName: 'ssbu',
    players: 64,
    image: '/tournaments/ssbu.jpg',
    shortRewards: '650€',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 375€
        </li>
        <li>
          2<sup>ème</sup> place : 175€
        </li>
        <li>
          3<sup>ème</sup> place : 100€
        </li>
      </ul>
    ),
    toornamentId: '5045512183706099712',
    format: '64 joueurs',
    rules: `${uploadsUrl()}/rules/ssbu.pdf`,
  },
  {
    name: 'osu!',
    shortName: 'osu',
    players: 24,
    image: '/tournaments/osu.jpg',
    shortRewards: '300€',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 150€
        </li>
        <li>
          2<sup>ème</sup> place : 75€
        </li>
        <li>
          3<sup>ème</sup> place : 45€
        </li>
        <li>
          4<sup>ème</sup> place : 30€
        </li>
      </ul>
    ),
    toornamentId: null,
    format: (
      <>
        24 joueurs qualifiés.{' '}
        <a href="https://osu.ppy.sh/community/forums/topics/1409204">Inscription aux qualifications ici.</a>
      </>
    ),
    rules: `https://osu.ppy.sh/community/forums/topics/1409204`,
  },
  {
    name: 'Libre',
    shortName: 'open',
    players: 24,
    image: '/tournaments/open.jpg',
    shortRewards: 'lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : lots
        </li>
        <li>
          2<sup>ème</sup> place : lots
        </li>
        <li>
          3<sup>ème</sup> place : lots
        </li>
      </ul>
    ),
    toornamentId: null,
    format: '24 joueurs',
    rules: `${uploadsUrl()}/rules/open.pdf`,
  },
];
