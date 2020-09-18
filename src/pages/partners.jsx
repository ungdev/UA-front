import React from 'react';

import { Card, Title } from '../components/UI';
import partnersList from '../assets/partners';

const Partners = () => {
  const partners = partnersList.map(({ link, img, description }) => (
    <div className="partner" key={link}>
      <Card
        imgSrc={img}
        className="partner-card"
        classNameImg="partner-img"
        content={description}
        href={link}
        target="_blank"
        buttonContent={
          <>
            Plus d'infos
            <i className="fas fa-chevron-right right-arrow" />
          </>
        }
      />
    </div>
  ));

  return (
    <div id="partners">
      <Title align="center" uppercase>
        Partenaires
      </Title>

      <div className="partners-list">{partners}</div>
    </div>
  );
};

export default Partners;
