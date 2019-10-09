import React from 'react';
import Link from 'next/link';

import { TournamentCards } from '../components';
import { Title, VideoContainer, Table, Countdown, Button, Card } from '../components/UI';
import indexText from '../assets/index';
import partnersList from '../assets/partners';

import './index.css';

const listPartners = partnersList.map((partner) => (
  <div className="partner" key={partner.link}>
    <a
      href={partner.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Partenaire ${partner.name}`}
    >
      <Card imgSrc={partner.img} classNameImg="partner-img" />
    </a>
  </div>
));

const Home = () => (
  <div id="home">
    <div className="home-header">
      <img src="/static/logo-notext-whiteshadow.svg" alt="" id="logo" />

      <div className="home-title">
        <p className="main">UTT Arena</p>
        <p>6, 7 et 8 décembre 2019</p>
      </div>
    </div>

    <div className="home-container page-padding">
      <div className="home-countdown">
        <Countdown date={new Date('December 6 2019 17:00:00')} />
      </div>

      <div className="home-info">
        <Title align="center" uppercase>Informations</Title>
        <Title level={4} align="center" uppercase>{indexText.information.catchPhrase}</Title>

        <p>{indexText.information.description}</p>

        <VideoContainer
          src="https://www.youtube.com/embed/K_Jchg4MIh0"
          title="Aftermovie UTT Arena 2018"
          className="video-container"
        />

        <Table
          columns={indexText.information.tableColumns}
          dataSource={indexText.information.tableRows}
          className="info-table"
        />

        <Link href="/information">
          <Button
            primary
            className="info-button"
            rightIcon="fas fa-chevron-right"
          >
            Toutes les informations
          </Button>
        </Link>
      </div>

      <div className="home-tournaments">
        <TournamentCards />
      </div>

      <div className="home-partners">
        <Title align="center" uppercase>Partenaires</Title>
        <div className="list-partners">
          { listPartners }
        </div>

        <Link href="/partners">
          <Button
            primary
            className="partners-button"
            rightIcon="fas fa-chevron-right"
          >
            Tous les partenaires
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
