import React from 'react';
import Link from 'next/link';
import { Title, VideoContainer, Table, Countdown, CardsTournaments, Button, Card } from '../components';

import text from '../assets/text';
import partnersList from '../assets/partners.json';
import './index.css';

const columns = [
  { title: '', key: 'title' },
  { title: '', key: 'description' },
];

const dataSource = [
  { title: <strong>Format</strong>, description: 'Bring Your Own Stuff (Ramène ton ordinateur, écran, souris, tapis de souris, casque, multiprise et câble RJ45 de 5m minimum… Bref, tout ce dont tu as besoin pour jouer)' },
  { title: <strong>Ouverture</strong>, description: '6 décembre 2019 - 17h' },
  { title: <strong>Fermeture</strong>, description: '8 décembre 2019 - 18h' },
  { title: <strong>Début des tournois</strong>, description: 'Samedi 7 décembre à 10h précises' },
  { title: <strong>Nourriture</strong>, description: 'Sur place, pendant tout l\'événement' },
  { title: <strong>Places</strong>, description: '460' },
  { title: <strong>Tarifs</strong>, description: 'Joueur 20€, Accompagnateur 12€' },
  { title: <strong>Âge minimum</strong>, description: '15 ans' },
  { title: <strong>Tournois avec Cashprize</strong>, description: 'LoL Pro, CS:GO, SSBU, Fortnite' },
  { title: <strong>Tournois sans Cashprize</strong>, description: 'LoL Amateur, tournoi libre (dont osu!)' },
];

const listPartners = partnersList.map((partner) => (
  <div className="partner" key={partner.link}>
    <a href={partner.link}>
      <Card imgSrc={partner.img} classNameCard="white-card" classNameImg="partner-img" />
    </a>
  </div>
));

const Home = () => (
  <div id="home">
    <div className="home-header">
      <img src="/static/logo-notext-whiteshadow.svg" alt="logo" id="logo" />
      <div className="home-title">
        <p className="main">UTT Arena</p>
        <p>6, 7 et 8 décembre 2019</p>
      </div>
    </div>
    <div className="home-container">
      <div className="home-countdown">
        <Countdown date={new Date('December 6 2019 17:00:00')} />
      </div>
      <div className="home-info">
        <Title align="center" uppercase>Informations</Title>
        <Title level={4} align="center" uppercase>{text.index.information.catchPhrase}</Title>
        <p>{text.index.information.description}</p>
        <VideoContainer
          src="https://www.youtube.com/embed/K_Jchg4MIh0"
          title="Aftermovie UTT Arena 2018"
          className="video-container"
        />
        <Table
          columns={columns}
          dataSource={dataSource}
          className="info-table"
        />
        <Link href="/informations">
          <Button primary className="info-button">
            Toutes les informations
            <i className="fas fa-chevron-right" />
          </Button>
        </Link>
      </div>
      <div className="home-tournaments">
        <CardsTournaments />
      </div>
      <div className="home-partners">
        <Title align="center" uppercase>Partenaires</Title>
        <div className="list-partners">
          { listPartners }
        </div>
      </div>
    </div>
  </div>
);

export default Home;
