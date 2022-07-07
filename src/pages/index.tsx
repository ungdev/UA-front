import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Partner } from '../types';
import TournamentCards from '../components/TournamentCards';
import { Title, VideoContainer, Table, Countdown, Button, Card, LogoSVG, Loader } from '../components/UI';

const Home = () => {

  return (
    <div id="home">
      <div className="home-header">
        <div id="logo">
          <LogoSVG />
        </div>
        <div className="home-title">
          <p className="main">L'UTT Arena revient</p>
          <p>les 2, 3 et 4 décembre 2022 !</p>
        </div>
      </div>

      <div className="home-container page-padding">
        <div className="home-info">
          <Countdown date={new Date('November 26 2021 17:00:00 UTC+1')} className="home-countdown" />

          <Title align="center">Informations</Title>
          <Title level={4} align="center" className="uppercase">
            L'UTT Arena de retour en présentiel
          </Title>

          <p>
            LE rendez-vous gaming annuel de la région Auboise aura lieu les{' '}
            <span className="accent">26, 27 et 28 novembre 2021</span> à l’espace Argence en{' '}
            <span className="accent">plein centre ville de Troyes</span> ! Plus de{' '}
            <span className="accent">
              2000 m<sup>2</sup> de gaming
            </span>{' '}
            t'attendent pendant ces 3 jours de folie ! Au programme : <span className="accent">5 tournois</span> sur tes
            jeux favoris, 3 jours pour montrer tes skills parmis les <span className="accent">450 joueurs</span> qui
            composeront l’évènement et tenter de remporter les <span className="accent">cashprizes, lots</span> et de
            nombreuses autres <span className="accent">surprises</span> ! Et pour animer cette édition, des{' '}
            <span className="accent">guests d’exception</span> viendront caster cette édition qui s’annonce enflammée !
            Alors prépare tout ton stuff et <span className="accent">impose toi dans l’arène !</span>
          </p>

          <VideoContainer
            src="https://www.youtube.com/embed/IdwHDWNprFY"
            title="Trailer UTT Arena 2021"
            className="video-container"
          />

          <a href="https://www.twitch.tv/uttarena">
            <Button primary leftIcon="fab fa-twitch" className="stream-link">
              Voir le stream
            </Button>
          </a>

          <Table
            columns={[
              { title: '', key: 'title' },
              { title: '', key: 'description' },
            ]}
            dataSource={[
              {
                title: <strong>Lieu</strong>,
                description: "A l'espace Argence !",
              },
              {
                title: <strong>Ouverture de l'UTT Arena, discours et concert</strong>,
                description: 'Vendredi 26 novembre à 17h',
              },
              { title: <strong>Début des tournois</strong>, description: 'Samedi 27 novembre à 10h' },
              { title: <strong>Places</strong>, description: '450 joueurs + 50 spectateurs' },
              { title: <strong>Tarif</strong>, description: '20 €' },
              { title: <strong>Âge minimum</strong>, description: "15 ans le jour de l'évènement" },
              {
                title: <strong>Tournois</strong>,
                description: 'LoL compétitif, LoL loisir, Rocket League, CS:GO, SSBU by Murex, osu!, Libre',
              },
            ]}
            className="info-table"
          />

          <Link href="/information">
            <a>
              <Button primary className="info-button" rightIcon="fas fa-chevron-right">
                Toutes les informations
              </Button>
            </a>
          </Link>
        </div>

        <div className="home-tournaments">
          <TournamentCards />
        </div>

      </div>
    </div>
  );
};

export default Home;
