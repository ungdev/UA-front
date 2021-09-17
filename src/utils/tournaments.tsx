import React from 'react';
import { uploadsUrl } from './environment';

export default [
  {
    name: 'League of Legends pro',
    shortName: 'lol',
    players: 80,
    image: '/tournaments/lol_pro.jpg',
    shortRewards: 'A venir...', // '850€ + lots',
    rewards: (
      <ul>
        <li>A venir...</li>
        {/* <li>
          1<sup>ère</sup> place : 425€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 275€ + lots
        </li>
        <li>
          3<sup>ème</sup> place : 150€
        </li> */}
      </ul>
    ),
    toornamentId: '3964490483953033216',
    format: '32 équipes de 5 joueurs',
    rules: `${uploadsUrl()}/rules/lol_pro.pdf`,
  },
  {
    name: 'League of Legends amateur',
    shortName: 'lolamateur',
    players: 80,
    image: '/tournaments/lol_amateur.jpg',
    shortRewards: 'A venir...', // '850€ + lots',
    rewards: (
      <ul>
        <li>A venir...</li>
        {/* <li>
          1<sup>ère</sup> place : 425€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 275€ + lots
        </li>
        <li>
          3<sup>ème</sup> place : 150€
        </li> */}
      </ul>
    ),
    toornamentId: '3964490483953033216',
    format: '32 équipes de 5 joueurs',
    rules: `${uploadsUrl()}/rules/lol_amateur.pdf`,
  },
  {
    name: 'Rocket League',
    shortName: 'rocket-league',
    players: 96,
    image: '/tournaments/rl.jpg',
    shortRewards: 'A venir...', // '700€ + lots',
    rewards: (
      <ul>
        <li>A venir...</li>
        {/* <li>
          1<sup>ère</sup> place : 375€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 225€ + lots
        </li>
        <li>
          3<sup>ème</sup> place : 100€
        </li> */}
      </ul>
    ),
    toornamentId: '3964512438822207488',
    format: '32 équipes de 3 joueurs',
    rules: `${uploadsUrl()}/rules/rl.pdf`,
  },
  {
    name: 'Counter-Strike: Global Offensive',
    shortName: 'csgo',
    players: 80,
    image: '/tournaments/csgo.jpg',
    shortRewards: 'A venir...', // '700€ + lots',
    rewards: (
      <ul>
        A venir...
        {/* <li>
          1<sup>ère</sup> place : 375€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 225€ + lots
        </li>
        <li>
          3<sup>ème</sup> place : 100€
        </li> */}
      </ul>
    ),
    toornamentId: '3964440948621860864',
    format: '16 équipes de 5 joueurs',
    rules: `${uploadsUrl()}/rules/csgo.pdf`,
  },
  {
    name: 'SSBU by Murex',
    shortName: 'ssbu',
    players: 64,
    image: '/tournaments/ssbu.jpg',
    shortRewards: 'A venir...', // '380€ + lots',
    rewards: (
      <ul>
        <li>A venir...</li>
        {/* <li>
          1<sup>ère</sup> place : 170€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 125€
        </li>
        <li>
          3<sup>ème</sup> place : 85€
        </li> */}
      </ul>
    ),
    toornamentId: '3968020242978578432',
    format: '64 joueurs',
    rules: `${uploadsUrl()}/rules/ssbu.pdf`,
  },
  {
    name: 'osu!',
    shortName: 'osu',
    players: 24,
    image: '/tournaments/osu.jpg',
    shortRewards: 'A venir...', // '420€ + lots',
    rewards: (
      <ul>
        <li>A venir...</li>
        {/* <li>
          1<sup>ère</sup> place : 225€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 135€
        </li>
        <li>
          3<sup>ème</sup> place : 60€
        </li> */}
      </ul>
    ),
    toornamentId: '3968011074334515200',
    format: '24 joueurs',
    rules: `${uploadsUrl()}/rules/osu.pdf`,
  },
  {
    name: 'Libre',
    shortName: 'open',
    players: 24,
    image: '/tournaments/open.jpg',
    shortRewards: 'A venir...', // '200€ + lots',
    rewards: (
      <ul>
        <li>A venir...</li>
        {/* <li>
          1<sup>ère</sup> place : 80€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 65€
        </li>
        <li>
          3<sup>ème</sup> place : 55€
        </li> */}
      </ul>
    ),
    toornamentId: '3964519359953436672',
    format: '24 joueurs',
    rules: `${uploadsUrl()}/rules/open.pdf`,
  },
];
