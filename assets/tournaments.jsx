import React from 'react';

export default {
  lolpro: {
    title: 'League of Legends (Pro)',
    format: (
      <>
        <div className="tournament-format">16 équipes de 5 joueurs.</div>
        Description du tournoi à venir.
      </>
    ),
    rewards: 'Les récompenses seront bientôt annoncées.',
    rules: 'Le règlement sera bientôt publié.',
  },
  lolamateur: {
    title: 'League of Legends (Amateur)',
    format: (
      <>
        <div className="tournament-format">16 équipes de 5 joueurs.</div>
        <ul>
          <li>Description du déroulement du tournoi à venir.</li>
        </ul>
      </>
    ),
    rewards: 'Les récompenses seront bientôt annoncées.',
    rules: 'Le règlement sera bientôt publié.',
  },
  fortnite: {
    title: 'Fortnite',
    format: (
      <>
        <div className="tournament-format">32 équipes en trio.</div>
        <ul>
          <li>Description du déroulement du tournoi à venir.</li>
        </ul>
      </>
    ),
    rewards: 'Les récompenses seront bientôt annoncées.',
    rules: 'Le règlement sera bientôt publié.',
  },
  csgo: {
    title: 'Counter-Strike : Global Offensive',
    format: (
      <>
        <div className="tournament-format">16 équipes de 5 joueurs.</div>
        <ul>
          <li>Description du déroulement du tournoi à venir.</li>
        </ul>
      </>
    ),
    rewards: 'Les récompenses seront bientôt annoncées.',
    rules: 'Le règlement sera bientôt publié.',
  },
  ssbu: {
    title: 'Super Smash Bros Ultimate',
    format: (
      <>
        <div className="tournament-format">32 joueurs en solo.</div>
        <ul>
          <li>Description du déroulement du tournoi à venir.</li>
        </ul>
      </>
    ),
    rewards: 'Les récompenses seront bientôt annoncées.',
    rules: 'Le règlement sera bientôt publié.',
  },
};
