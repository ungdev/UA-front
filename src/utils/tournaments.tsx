import React from 'react';
import { uploadsUrl } from './environment';

export default [
  {
    name: 'League of Legends compétitif',
    shortName: 'lolCompetitive',
    players: 80,
    image: '/tournaments/lol_pro.jpg',
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
    toornamentId: '3964490483953033216',
    format: '16 équipes de 5 joueurs',
    // rules: `${uploadsUrl()}/rules/lol_pro.pdf`,
  },
  {
    name: 'League of Legends loisir',
    shortName: 'lolLeisure',
    players: 80,
    image: '/tournaments/lol_amateur.jpg',
    shortRewards: 'lots',
    toornamentId: '3964490483953033216',
    format: '16 équipes de 5 joueurs',
    // rules: `${uploadsUrl()}/rules/lol_amateur.pdf`,
  },
  {
    name: 'Rocket League',
    shortName: 'rl',
    players: 96,
    image: '/tournaments/rl.jpg',
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
    toornamentId: '3964512438822207488',
    format: '32 équipes de 3 joueurs',
    // rules: `${uploadsUrl()}/rules/rl.pdf`,
  },
  {
    name: 'Counter-Strike: Global Offensive',
    shortName: 'csgo',
    players: 80,
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
    toornamentId: '3964440948621860864',
    format: '16 équipes de 5 joueurs',
    // rules: `${uploadsUrl()}/rules/csgo.pdf`,
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
    toornamentId: '3968020242978578432',
    format: '64 joueurs',
    // rules: `${uploadsUrl()}/rules/ssbu.pdf`,
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
    // rules: `${uploadsUrl()}/rules/osu.pdf`,
  },
  {
    name: 'Libre',
    shortName: 'open',
    players: 24,
    image: '/tournaments/open.jpg',
    shortRewards: 'lots',
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
    // rules: `${uploadsUrl()}/rules/open.pdf`,
  },
];
