import React from 'react';
import Link from 'next/link';
import { Collapse, Title } from '../../components';

import text from '../../assets/text.json';
import './index.css';

const Tournaments = () => (
  <div id="tournaments">
    <Title align="center">Tournois</Title>
    <div className="tournaments-list">
      { text.toornamentList.map(({ title, cashprize, slot, img, link }) => (
        <Link href={link} key={link}>
          <div className="tournament" key={title}>
            <Collapse
              title={(
                <div>
                  <p>{title}</p>
                  <p>{`Cashprize: ${cashprize}`}</p>
                  <p>{`Slot: 0/${slot}`}</p>
                </div>
              )}
              imgSrc={img}
            />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default Tournaments;
