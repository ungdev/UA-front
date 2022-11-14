import React from 'react';
import { uploadsUrl } from './environment';

const tournaments = [
  {
    name: 'League of Legends',
    shortName: 'lol',
    players: 160,
    teamCount: 32,
    image: '/tournaments/lol.jpg',
    shortRewards: '1600€',
    rewards: (
      <ul className="rewards">
        <li>
          1<sup>ère</sup> place : 1000€
        </li>
        <li>
          2<sup>ème</sup> place : 400€
        </li>
        <li>
          3<sup>ème</sup> place : 200€
        </li>
      </ul>
    ),
    casters: <>À venir</>,
    toornamentId: '6075789370007052288',
    format: <>32 équipes de 5 joueurs</>,
    rules: `${uploadsUrl()}/rules/lol.pdf`,
  },
  {
    name: 'Super Smash Bros. Ultimate',
    shortName: 'ssbu',
    players: 128,
    image: '/tournaments/ssbu.jpg',
    shortRewards: '1000€',
    rewards: (
      <ul className="rewards">
        <li>
          1<sup>ère</sup> place : 400€
        </li>
        <li>
          2<sup>ème</sup> place : 250€
        </li>
        <li>
          3<sup>ème</sup> place : 150€
        </li>
        <li>
          4<sup>ème</sup> place : 100€
        </li>
        <li>
          5<sup>ème</sup> place : 30€
        </li>
        <li>
          6<sup>ème</sup> place : 30€
        </li>
        <li>
          7<sup>ème</sup> place : 20€
        </li>
        <li>
          8<sup>ème</sup> place : 20€
        </li>
      </ul>
    ),
    casters: <>À venir</>,
    toornamentId: '6075850592720207872',
    format: <>128 joueurs</>,
    rules: `${uploadsUrl()}/rules/ssbu.pdf`,
  },
  {
    name: 'Counter-Strike: Global Offensive',
    shortName: 'csgo',
    players: 80,
    teamCount: 16,
    image: '/tournaments/csgo.jpg',
    shortRewards: '1600€',
    rewards: (
      <ul className="rewards">
        <li>
          1<sup>ère</sup> place : 1000€
        </li>
        <li>
          2<sup>ème</sup> place : 400€
        </li>
        <li>
          3<sup>ème</sup> place : 200€
        </li>
      </ul>
    ),
    casters: <>À venir</>,
    toornamentId: '6075838913743224832',
    format: <>16 équipes de 5 joueurs</>,
    rules: `${uploadsUrl()}/rules/csgo.pdf`,
  },
  {
    name: 'Valorant',
    shortName: 'valorant',
    players: 80,
    teamCount: 16,
    image: '/tournaments/valorant.jpg',
    shortRewards: '1500€',
    rewards: (
      <ul className="rewards">
        <li>
          1<sup>ère</sup> place : 950€
        </li>
        <li>
          2<sup>ème</sup> place : 350€
        </li>
        <li>
          3<sup>ème</sup> place : 200€
        </li>
      </ul>
    ),
    casters: <>À venir</>,
    toornamentId: '6075842198609117184',
    format: <>16 équipes de 5 joueurs</>,
    rules: `${uploadsUrl()}/rules/valorant.pdf`,
  },
  {
    name: 'Rocket League',
    shortName: 'rl',
    players: 48,
    teamCount: 16,
    image: '/tournaments/rocket-league.jpg',
    shortRewards: '1200€',
    rewards: (
      <ul className="rewards">
        <li>
          1<sup>ère</sup> place : 720€
        </li>
        <li>
          2<sup>ème</sup> place : 300€
        </li>
        <li>
          3<sup>ème</sup> place : 180€
        </li>
      </ul>
    ),
    casters: <>À venir</>,
    toornamentId: '6075845290060611584',
    format: <>16 équipes de 3 joueurs</>,
    rules: `${uploadsUrl()}/rules/rocket-league.pdf`,
  },
  {
    name: 'osu!',
    shortName: 'osu',
    players: 48,
    image: '/tournaments/osu.jpg',
    shortRewards: '400€',
    rewards: (
      <>
        <span className="accent">Tournoi osu!</span> (à diviser en duo)
        <ul className="rewards">
          <li>
            1<sup>ère</sup> place : 150€
          </li>
          <li>
            2<sup>ème</sup> place : 70€
          </li>
          <li>
            3<sup>ème</sup> place : 30€
          </li>
        </ul>
        <span className="accent">Tournoi osu!mania</span>
        <ul className="rewards">
          <li>
            1<sup>ère</sup> place : 100€
          </li>
          <li>
            2<sup>ème</sup> place : 30€
          </li>
          <li>
            3<sup>ème</sup> place : 20€
          </li>
        </ul>
      </>
    ),
    casters: <>À venir</>,
    toornamentId: null,
    format: <>48 joueurs qualifiés</>,
    rules: `https://osu.ppy.sh/community/forums/topics/1661444`,
  },
  {
    name: 'Teamfight Tactics',
    shortName: 'tft',
    players: 32,
    image: '/tournaments/tft.jpg',
    shortRewards: '500€',
    rewards: (
      <ul className="rewards">
        <li>
          1<sup>ère</sup> place : 250€
        </li>
        <li>
          2<sup>ème</sup> place : 125€
        </li>
        <li>
          3<sup>ème</sup> place : 75€
        </li>
        <li>
          4<sup>ème</sup> place : 50€
        </li>
      </ul>
    ),
    toornamentId: '6075854270634475520',
    format: <>32 joueurs</>,
    rules: `${uploadsUrl()}/rules/tft.pdf`,
  },
  {
    name: 'Libre',
    shortName: 'open',
    players: 56,
    image: '/tournaments/open.jpg',
    // shortRewards: 'À venir',
    // rewards: <>À venir</>,
    // (
    //   <ul className="rewards">
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
    toornamentId: null,
    format: <>56 joueurs</>,
    rules: `${uploadsUrl()}/rules/open.pdf`,
  },
];

export default tournaments;
