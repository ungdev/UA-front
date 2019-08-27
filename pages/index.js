import React from 'react';
import { Title, VideoContainer } from '../components';

import text from './text.json';
import './index.css';

const Home = () => (
  <div id="home">
    <div className="home-header">
      <div className="home-logo" />
      <Title level={1} align="center">UTT ARENA</Title>
      <Title level={2} align="center">6, 7 et 8 Décembre 2019</Title>
    </div>
    <div className="home-info">
      <Title level={2} align="center">Informations</Title>
      <Title level={4} align="center">{text.index.information.catchPhrase}</Title>
      <p>{text.index.information.description}</p>
      <VideoContainer
        src="https://www.youtube.com/embed/YZKiylJWSCM"
        title="Teaser"
        style={{ maxWidth: 700, margin: '40px auto 20px auto' }}
      />
    </div>
    <div className="home-toornament">
      <Title level={2} align="center">Tournois</Title>
      <Title level={4} align="center">{text.index.tournois.catchPhrase}</Title>
    </div>
    <div className="home-partenaires">
      <Title level={2} align="center">Partenaires</Title>
    </div>
  </div>
);

export default Home;
