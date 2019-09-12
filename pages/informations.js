import React from 'react';
import { Title, Table, Header } from '../components';

import './informations.css';
import text from '../assets/text';

const columns = [
  { title: '', key: 'type' },
  { title: <>Vendredi&nbsp;6</>, key: 'ven' },
  { title: <>Samedi&nbsp;7</>, key: 'sam' },
  { title: <>Dimanche&nbsp;8</>, key: 'dim' },
];

const dataSource = [
  { key: '1', type: <>UTT&nbsp;Arena</>, ven: '17h - 00h', sam: '00h - 00h', dim: '00h - 18h' },
  { key: '2', type: <>Festival&nbsp;des&nbsp;jeux</>, ven: '17h - 21h', sam: '11h - 22h', dim: '11h - 18h' },
];

const Informations = () => (
  <div>
    <Header />

    <div id="info">
      <Title align="center" uppercase>Présentation</Title>
      <div className="margin-bottom">
        <p>{text.info.presentation}</p>
      </div>

      <Title align="center" uppercase>Accès</Title>
      <div>
        <Title level={4} uppercase>Adresse</Title>
        <p>
          <strong>UTT Arena</strong>
          , 20 rue des Gayettes, 10000 Troyes
        </p>
        <div className="info-acces">
          <div className="info-map">
            <iframe
              height="320"
              width="100%"
              title="Google Maps"
              src="https://maps.google.com/maps?q=UTT+Arena&t=&z=15&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            />
          </div>
          <div className="info-map">
            {text.info.acces.map((moyen) => (
              <React.Fragment key={moyen.title}>
                <Title level={4}>{moyen.title}</Title>
                <p>{moyen.text}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <Title align="center" uppercase>Horaires</Title>
      <div className="margin-bottom">
        <Table columns={columns} dataSource={dataSource} className="timetable" />
      </div>

      <Title align="center" uppercase>Billetterie</Title>
      <div className="margin-bottom">
        {text.info.billeterie.map((paraph) => (
          <div key={paraph.text}>
            <p>{paraph.text}</p>
            <ul>
              {paraph.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Title align="center" uppercase>Infos joueurs</Title>
      <div className="margin-bottom">
        <p>{text.info.joueurs.desc}</p>
        <Title level={4}>Ce qu&apos;il faut apporter</Title>
        <ul>
          {text.info.joueurs.apporte.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{text.info.joueurs.vente}</p>
        <Title level={4}>Ce qui est fourni</Title>
        <ul>
          {text.info.joueurs.fourni.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Title level={4}>Streaming</Title>
        <p>{text.info.joueurs.streaming}</p>
      </div>

      <Title align="center" uppercase>Services</Title>
      <div className="margin-bottom">
        {text.info.services.map((service) => (
          <React.Fragment key={service.title}>
            <Title level={4}>{service.title}</Title>
            <p>{service.text}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default Informations;
