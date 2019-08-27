import React from 'react';
import { Title, VideoContainer, Collapse } from '../components';

import text from './text.json';
import './index.css';

const Home = () => (
  <div id="home">
    <div className="home-header margin-bottom">
      <div className="home-logo" />
      <Title level={1} align="center">UTT ARENA</Title>
      <Title level={2} align="center">6, 7 et 8 Décembre 2019</Title>
    </div>
    <div className="home-info margin-bottom">
      <Title level={2} align="center">I N F O R M A T I O N S</Title>
      <Title level={4} align="center">{text.index.information.catchPhrase}</Title>
      <p>{text.index.information.description}</p>
      <VideoContainer
        src="https://www.youtube.com/embed/YZKiylJWSCM"
        title="Teaser"
        style={{ maxWidth: 700, margin: '40px auto 20px auto' }}
      />
    </div>
    <div className="home-toornament margin-bottom">
      <Title level={2} align="center">T O U R N O I S</Title>
      <Title level={4} align="center">{text.index.tournois.catchPhrase}</Title>
      <div className="list-toornaments">
        { text.toornamentList.map(({ title, cashprize, slot, img }) => (
          <div className="toornament" key={title}>
            <Collapse
              title={(
                <div>
                  <p>{title}</p>
                  <p>{`Cashprize: ${cashprize}`}</p>
                  <p>{`Slot: 0/${slot}`}</p>
                </div>
              )}
              imgSrc={img}
            >
              TEAM
            </Collapse>
          </div>
        ))}
      </div>
    </div>
    <div className="home-partenaires margin-bottom">
      <Title level={2} align="center">Partenaires</Title>
    </div>
  </div>
);

export default Home;
