import React from 'react';

import Title from './UI/Title';
import Card from './UI/Card';
import text from '../assets/text';

import './CardsTournaments.css';

const CardsTournaments = () => (
  <div className="cardtournaments">
    <Title align="center" uppercase>Tournois</Title>
    <Title level={4} align="center">{text.index.tournois.catchPhrase}</Title>
    <div className="tournaments-list">
      { text.tournamentList.map(({ title, cashprize, players, img, link }) => (
        <div className="tournament" key={title}>
          <Card
            dark
            content={(
              <>
                <div className="tournament-title">{title}</div>
                <p>{`Places : ${players} joueurs`}</p>
                <p>{`Cashprize : ${cashprize}`}</p>
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

export default CardsTournaments;