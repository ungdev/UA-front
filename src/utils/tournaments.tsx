import React from 'react';
import { uploadsUrl } from './environment';

export default [
  {
    name: 'League of Legends',
    shortName: 'lol',
    players: 160,
    image: '/tournaments/lol.jpg',
    shortRewards: '500€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 250€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 150€
        </li>
        <li>
          3<sup>ème</sup> place : 100€
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
    shortRewards: '500€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 250€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 150€
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
    shortRewards: '500€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 250€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 150€
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
    shortRewards: '250€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 120€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 80€
        </li>
        <li>
          3<sup>ème</sup> place : 50€
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
    shortRewards: '200€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 90€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 70€
        </li>
        <li>
          3<sup>ème</sup> place : 40€
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
    players: 16,
    image: '/tournaments/tft.png',
    shortRewards: '150€ + lots',
    rewards: (
      <ul>
        <li>
          1<sup>ère</sup> place : 70€ + lots
        </li>
        <li>
          2<sup>ème</sup> place : 50€
        </li>
        <li>
          3<sup>ème</sup> place : 30€
        </li>
      </ul>
    ),
    toornamentId: '3964519359953436672',
    format: '16 joueurs',
    rules: `${uploadsUrl()}/rules/tft.pdf`,
  },
];
