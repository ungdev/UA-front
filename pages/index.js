import React from 'react';
import parse from 'html-react-parser';
import { Title, VideoContainer, Collapse, Table, Countdown } from '../components';

import text from '../assets/text.json';
import './index.css';

const columns = [
  { title: '', key: 'titre' },
  { title: '', key: 'description' },
];

const dataSource = [
  { key: '1', titre: <strong>Format</strong>, description: 'Bring Your Own Computer (casque, multiprise et RJ45 à amener)' },
  { key: '2', titre: <strong>Ouverture</strong>, description: '6 décembre 2019 - 17h' },
  { key: '3', titre: <strong>Fermeture</strong>, description: '8 décembre 2019 - 18h' },
  { key: '4', titre: <strong>Nourriture</strong>, description: 'Sur place' },
  { key: '5', titre: <strong>Horaires</strong>, description: '24h/24 (nourriture aussi)' },
  { key: '6', titre: <strong>Places</strong>, description: '460' },
  { key: '7', titre: <strong>Tarif</strong>, description: '15€' },
  { key: '8', titre: <strong>Âge minimum</strong>, description: '15 ans' },
  { key: '9', titre: <strong>Tournois</strong>, description: '5 (les tournois commencent le samedi à 10h précises)' },
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
      <Countdown date={new Date('September 15, 2019 17:00:00')} />
    </div>
    <div className="home-info margin-bottom padding">
      <Title align="center">INFORMATIONS</Title>
      <Title level={4} align="center">{text.index.information.catchPhrase}</Title>
      <p>{parse(text.index.information.description)}</p>
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
