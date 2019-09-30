import React from 'react';

import { Card, Title } from './UI';
import tournamentCardsText from '../assets/tournamentCards';

import './TournamentCards.css';

const tournamentCards = () => (
  <div className="tournament-cards">
    <Title align="center" uppercase>Tournois</Title>
    <Title level={4} align="center" uppercase>{tournamentCardsText.catchPhrase}</Title>

    <div className="tournaments-list">
      { tournamentCardsText.list.map(({ title, cashprize, players, img, link }) => (
        <div className="tournament" key={title}>
          <Card
            dark
            content={(
              <>
                <div className="tournament-title">{title}</div>
                <p><strong>Places :</strong> {players} joueurs</p>
                <p><strong>Cashprize :</strong> {cashprize}</p>
              </>
            )}
            imgSrc={img}
            href={link}
            buttonContent={(
              <>
                Plus d'infos
                <i className="fas fa-chevron-right right-arrow" />
              </>
            )}
          />
        </div>
      ))}
    </div>
  </div>
);

export default tournamentCards;