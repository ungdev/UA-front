import React from 'react';
import { Title, VideoContainer, Table, Countdown, CardsTournaments } from '../components';

import text from '../assets/text';
import './index.css';

const columns = [
  { title: '', key: 'titre' },
  { title: '', key: 'description' },
];

const dataSource = [
  { titre: <strong>Ouverture</strong>, description: '6 décembre 2019 - 17h' },
  { titre: <strong>Fermeture</strong>, description: '8 décembre 2019 - 18h' },
  { titre: <strong>Début des tournois</strong>, description: 'Samedi 7 décembre à 10h précises' },
  { titre: <strong>Tarifs</strong>, description: 'Joueur 20€, Accompagnateur 12€' },
  { titre: <strong>Places</strong>, description: '460' },
  { titre: <strong>Nourriture</strong>, description: 'Sur place, pendant tout l\'événement' },
  { titre: <strong>Âge minimum</strong>, description: '15 ans' },
];

const Home = () => (
  <div id="home">
    <div className="home-header">
      <img src="/static/logo-notext-whiteshadow.svg" alt="logo" id="logo" />
      <div className="home-title">
        <p className="main">UTT Arena</p>
        <p>6, 7 et 8 décembre 2019</p>
      </div>
    </div>
    <div className="home-countdown">
      <Countdown date={new Date('December 6 2019 17:00:00')} />
    </div>
    <div className="home-info">
      <Title align="center" uppercase>Informations</Title>
      <Title level={4} align="center" uppercase>{text.index.information.catchPhrase}</Title>
      <p>{text.index.information.description}</p>
      <VideoContainer
        src="https://www.youtube.com/embed/YZKiylJWSCM"
        title="Trailer UTT Arena 2018"
        className="video-container"
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        className="info-table"
      />
    </div>
    <div className="home-tournaments">
      <CardsTournaments />
    </div>
    <div className="home-partners">
      <Title align="center" uppercase>Partenaires</Title>
    </div>
  </div>
);

export default Home;
