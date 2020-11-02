import React from 'react';
import { uploadsUrl } from './environment';

export default [
  {
    name: 'League of Legends',
    shortName: 'lol',
    players: 160,
    image: '/tournaments/lol.jpg',
    shortRewards: '850€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 425€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 275€
        </li>
        <li>
          3<sup>ème</sup> place : 150€
        </li>
      </ul>
    ),
    toornamentId: '3964490483953033216',
    format: '32 équipes de 5 joueurs',
    rules: `${uploadsUrl()}/rules/lol.pdf`,
  },
  {
    name: 'Valorant',
    shortName: 'valorant',
    players: 80,
    image: '/tournaments/valorant.jpg',
    shortRewards: '700€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 375€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 225€
        </li>
        <li>
          3<sup>ème</sup> place : 100€
        </li>
      </ul>
    ),
    toornamentId: '3964512438822207488',
    format: '16 équipes de 5 joueurs',
    rules: `${uploadsUrl()}/rules/valorant.pdf`,
  },
  {
    name: 'Counter-Strike: Global Offensive',
    shortName: 'csgo',
    players: 80,
    image: '/tournaments/csgo.jpg',
    shortRewards: '700€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 375€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 225€
        </li>
        <li>
          3<sup>ème</sup> place : 100€
        </li>
      </ul>
    ),
    toornamentId: '3964440948621860864',
    format: '16 équipes de 5 joueurs',
    rules: `${uploadsUrl()}/rules/csgo.pdf`,
  },
  {
    name: 'Super Smash Bros. Ultimate',
    shortName: 'ssbu',
    players: 64,
    image: '/tournaments/ssbu.png',
    shortRewards: '380€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 170€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 125€
        </li>
        <li>
          3<sup>ème</sup> place : 85€
        </li>
      </ul>
    ),
    toornamentId: '3968020242978578432',
    format: '64 joueurs',
    rules: `${uploadsUrl()}/rules/ssbu.pdf`,
  },
  {
    name: 'Rocket League',
    shortName: 'rocket-league',
    players: 48,
    image: '/tournaments/rocket-league.jpg',
    shortRewards: '315€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 150€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 105€
        </li>
        <li>
          3<sup>ème</sup> place : 60€
        </li>
      </ul>
    ),
    toornamentId: '3968011074334515200',
    format: '16 équipes de 3 joueurs',
    rules: `${uploadsUrl()}/rules/rocket-league.pdf`,
  },
  {
    name: 'Teamfight Tactics',
    shortName: 'tft',
    players: 64,
    image: '/tournaments/tft.png',
    shortRewards: '305€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 130€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 100€
        </li>
        <li>
          3<sup>ème</sup> place : 75€
        </li>
      </ul>
    ),
    toornamentId: '3964519359953436672',
    format: '64 joueurs',
    rules: `${uploadsUrl()}/rules/tft.pdf`,
  },
];
