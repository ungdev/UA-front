import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import TournamentCards from '../components/TournamentCards';
import { Title, VideoContainer, Table, Countdown, Button, LogoSVG, Loader, Card } from '../components/UI';
import { uploads } from '../utils/api';

const Home = () => {
  const [partners, setPartners] = useState([]);

  const fetchPartners = async () => {
    const request = await uploads.get('/partners/list.json', true);

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
          <p>
            <span className="accent">2</span>, <span className="accent">3</span> et <span className="accent">4</span>{' '}
            décembre 2022
          </p>
        </div>
      </div>

      <div className="home-container page-padding">
        <div className="home-info">
          <Countdown date={new Date('December 2 2022 18:00:00 UTC+1')} className="home-countdown" />

          <Title align="center">Informations</Title>

          <p>
            LE rendez-vous gaming annuel de la région Auboise aura lieu les{' '}
            <span className="accent">2, 3 et 4 décembre 2022</span> dans un lieu que vous connaissez bien : le Cube !{' '}
            Plus de{' '}
            <span className="accent">
              7500m<sup>2</sup>
            </span>{' '}
            t'attendent pour passer 3 jours de folie ! Au programme : <span className="accent">8 tournois</span> sur tes
            jeux favoris, 3 jours pour montrer tes skills parmis les <span className="accent">630 joueurs</span> qui
            composeront l’évènement, et tenter de remporter les <span className="accent">cashprizes, lots</span> et de
            nombreuses autres <span className="accent">surprises</span> ! Et pour animer cette édition, des{' '}
            <span className="accent">guests d’exception</span> viendront caster cette édition qui s’annonce enflammée !
            Alors prépare tout ton stuff et <span className="accent">impose toi dans l’arène !</span>
          </p>

          <VideoContainer
            src="https://www.youtube.com/embed/t_QP8_bYJ1c"
            title="Trailer UTT Arena 2022"
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
                description: 'Au Parc des Expositions  de Troyes !',
              },
              {
                title: <strong>Ouverture de l'UTT Arena, discours et concert</strong>,
                description: 'Vendredi 2 décembre à 18h',
              },
              { title: <strong>Début des tournois</strong>, description: 'Samedi 3 décembre à 10h' },
              { title: <strong>Places</strong>, description: '632 joueurs' },
              { title: <strong>Tarif</strong>, description: '25 € (22 € pour SSBU)' },
              { title: <strong>Âge minimum</strong>, description: "15 ans le jour de l'évènement" },
              {
                title: <strong>Tournois</strong>,
                description: 'SSBU, CS:GO, RL, LoL, Valorant, TFT, osu!, Libre',
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

        {/* <div className="home-partners">
          <Title align="center">Partenaires</Title>
          <div className="list-partners">
            {!partners ? (
              <Loader />
            ) : !partners.length ? (
              <i>Les partenaires seront bientôt annoncés</i>
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
          </div> */}

        {/* <Link href="/partners">
            <a>
              <Button primary className="partners-button" rightIcon="fas fa-chevron-right">
                Voir les partenaires
              </Button>
            </a>
          </Link> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
