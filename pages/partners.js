import React from 'react';

import { Card, Header, Title } from '../components';
import partnersList from '../assets/partners';
import './partners.css';

const Partners = () => {
  const partners = partnersList.map((partner) => (
    <div className="partner" key={partner.link}>
      <a href={partner.link}>
        <Card imgSrc={partner.img} classNameCard="white-card" classNameImg="partner-img" />
      </a>
    </div>
  ));

  return (
    <>
      <Header />

      <div id="partners" className="page-padding">
        <Title align="center" uppercase>Partenaires</Title>
        <div className="partners-list">
          { partners }
        </div>
      </div>
    </>
  );
};

export default Partners;