import React from 'react';
import { Title, VideoContainer, Collapse, Table, Countdown } from '../components';

import text from '../assets/text.json';
import './index.css';

const columns = [
  { title: '', key: 'titre' },
  { title: '', key: 'description' },
];

const dataSource = [
  { key: '1', titre: <b>Format</b>, description: 'Bring Your Own Computer (casque, multiprise et RJ45 à amener)' },
  { key: '2', titre: <b>Ouverture</b>, description: '6 décembre 2019 - 17h' },
  { key: '3', titre: <b>Fermeture</b>, description: '8 décembre 2019 - 18h' },
  { key: '4', titre: <b>Nourriture</b>, description: 'Sur place' },
  { key: '5', titre: <b>Horaires</b>, description: '24h/24 (nourriture aussi)' },
  { key: '6', titre: <b>Places</b>, description: '460' },
  { key: '7', titre: <b>Tarif</b>, description: '15€' },
  { key: '8', titre: <b>Âge minimum</b>, description: '15 ans' },
  { key: '9', titre: <b>Tournois</b>, description: '5 (les tournois commencent le samedi à 10h précises)' },
];

const Home = () => (
  <div id="home">
    <div className="home-header margin-bottom">
      <img src="/static/2019-logo-notext-whiteshadow.svg" alt="logo" id="logo" />
      <div className="home-title">
        <p className="main">utt arena</p>
        <p>6, 7 et 8 décembre 2019</p>
      </div>
    </div>
    <div className="home-countdown margin-bottom padding">
      <Countdown date={new Date('December 6, 2019 17:00:00')} />
    </div>
    <div className="home-info margin-bottom padding">
      <Title align="center">INFORMATIONS</Title>
      <Title level={4} align="center">{text.index.information.catchPhrase}</Title>
      <p>{text.index.information.description}</p>
      <VideoContainer
        src="https://www.youtube.com/embed/YZKiylJWSCM"
        title="Teaser"
        style={{ maxWidth: 700, margin: '40px auto 20px auto' }}
      />
      <Table columns={columns} dataSource={dataSource} />
    </div>
    <div className="home-toornament margin-bottom padding">
      <Title align="center">TOURNOIS</Title>
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
    <div className="home-partenaires margin-bottom padding">
      <Title align="center">PARTENAIRES</Title>
    </div>
  </div>
);

export default Home;
