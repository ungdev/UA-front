import React from 'react';
import { Card, Header, Title } from '../components';
import partnersList from '../assets/partners.json';
import './partners.css';

const partners = () => (
  <div>
    <Header />
    <div id="partners">
      <Title align="center" uppercase>Partenaires</Title>
      <div className="list-partners">
        { partnersList.map((partner) => (
          <div className="partner" key={partner.link}>
            <a href={partner.link}>
              <Card imgSrc={partner.img} className="white-card" classNameImg="partner-img" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default partners;