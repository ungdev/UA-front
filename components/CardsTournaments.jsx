import React from 'react';

import Card from './UI/Card';
import Title from './UI/Title';
import text from '../assets/text';
import './CardsTournaments.css';

const CardsTournaments = () => (
  <div>
    <Title align="center">tournois</Title>
    <Title level={4} align="center">{text.index.tournois.catchPhrase}</Title>
    <div className="cardstournaments-list">
      { text.toornamentList.map(({ title, cashprize, slot, img, link }) => (
        <div className="tournament" key={title}>
          <Card
            content={(
              <div>
                <p>{title}</p>
                <p>{`Cashprize: ${cashprize}`}</p>
                <p>{`Slot: 0/${slot}`}</p>
              </div>
            )}
            imgSrc={img}
            link={link}
            textButton="Plus d'info"
          />
        </div>
      ))}
    </div>
  </div>
);

export default CardsTournaments;
