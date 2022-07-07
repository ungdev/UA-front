import React from 'react';

import { Card, Title } from './UI';
import tournaments from '../utils/tournaments';

const TournamentCards = () => {

  return (
    <div className="tournament-cards">
      <Title align="center">Tournois</Title>
      <Title level={4} align="center" className="uppercase">
        Les 7 tournois à l'UTT Arena 2021
      </Title>

      <div className="tournaments-list">
        {tournaments.map(({ name, shortName, players, image, shortRewards }) => (
          <Card
            dark
            content={
              <>
                <div className="tournament-name">{name}</div>
                <p>
                  <strong>Places :</strong> {players} joueurs
                </p>
                {shortRewards && (
                  <p>
                    <strong>Récompenses :</strong> {shortRewards}
                  </p>
                )}
              </>
            }
            imgSrc={image}
            href={`/tournaments/${shortName}`}
            buttonContent={
              <>
                Plus d'infos <i className="fas fa-chevron-right right-arrow" />
              </>
            }
            className="tournament-card"
            key={shortName}
            alt={`Tournoi ${name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TournamentCards;
