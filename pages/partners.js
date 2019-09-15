import React from 'react';

import { Card, Header, Title } from '../components';
import partnersList from '../assets/partners';
import './partners.css';

const Partners = () => {
  const partners = partnersList.map(({ link, img, description }) => (
    <div className="partner" key={link}>
      <Card
        imgSrc={img}
        className="partner-card"
        classNameImg="partner-img"
        content={description}
        href={link}
        buttonContent={(
          <>
            Plus d'infos
            <i className="fas fa-chevron-right right-arrow" />
          </>
        )}
      />
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