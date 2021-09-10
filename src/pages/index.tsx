import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Partner } from '../types';
import TournamentCards from '../components/TournamentCards';
import { Title, VideoContainer, Table, Countdown, Button, Card, LogoSVG, Loader } from '../components/UI';
import { uploads } from '../utils/api';

const Home = () => {
  const [partners, setPartners] = useState<Partner[]>();

  const fetchPartners = async () => {
    const request = await uploads.get<Partner[]>('/partners/list.json');

    setPartners(request.data);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div id="home">
      <div className="home-header">
        <div id="logo">
          <LogoSVG />
        </div>
        <div className="home-title">
          <p className="main">UTT Arena</p>
          <p>26, 27, 28 novembre 2021</p>
        </div>
      </div>

      <div className="home-container page-padding">
        <div className="home-info">
          <Title align="center">Stream</Title>

          <Countdown date={new Date('November 26 2021 21:00:00 UTC+1')} className="home-countdown" />

          <a href="https://www.twitch.tv/uttarena">
            <Button primary leftIcon="fab fa-twitch" className="stream-link">
              Voir le stream
            </Button>
          </a>

          <Title align="center">Informations</Title>
          <Title level={4} align="center" className="uppercase">
            Un format repensé, toujours la même ambiance !
          </Title>

          <p>
            L'UTT Arena revient pour sa 19<sup>ème</sup> édition les{' '}
            <span className="accent">26, 27 et 28 novembre 2021</span>. Cette édition aura lieu pour la première fois{' '}
            <span className="accent">intégralement en ligne</span>. Au programme,{' '}
            <span className="accent">6 tournois spotlights</span> sur des incontournables de l'esport, du skill, des
            personnalités et des rencontres, de nombreuses animations, avec bien sûr du{' '}
            <span className="accent">cashprize</span> et des <span className="accent">lots</span> à gagner, qui rendront
            cette édition plus intense et vibrante que jamais. Comme toujours des invités de qualité seront présents
            pour streamer et commenter tes meilleures games ! Alors prépare tout ton stuff et{' '}
            <span className="accent">impose-toi dans l'arène !</span>
          </p>

          <VideoContainer
            src="https://www.youtube.com/embed/bjBwMWQX-DY"
            title="Trailer UTT Arena 2020"
            className="video-container"
          />

          <Table
            columns={[
              { title: '', key: 'title' },
              { title: '', key: 'description' },
            ]}
            dataSource={[
              {
                title: <strong>Format</strong>,
                description: "A l'espace Argence !",
              },
              { title: <strong>Discours d'ouverture</strong>, description: 'Vendredi 26 novembre' },
              { title: <strong>Début des tournois</strong>, description: 'Samedi 27 novembre' },
              { title: <strong>Places</strong>, description: '448 joueurs' },
              { title: <strong>Tarif</strong>, description: 'A venir...' },
              { title: <strong>Âge minimum</strong>, description: '16 ans' },
              { title: <strong>Tournois</strong>, description: 'LoL, osu!, CS:GO, SSBU, Rocket League, Libre' },
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

        <div className="home-partners">
          <Title align="center">Partenaires</Title>
          <div className="list-partners">
            {!partners ? (
              <Loader />
            ) : (
              partners.map((partner) => (
                <div className="partner" key={partner.link}>
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Partenaire ${partner.name}`}>
                    <Card imgSrc={partner.image} classNameImg="partner-img" alt={`Partenaire ${partner.name}`} />
                  </a>
                </div>
              ))
            )}
          </div>

          <Link href="/partners">
            <Button primary className="partners-button" rightIcon="fas fa-chevron-right">
              Voir les partenaires
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
