import React, { useEffect, useState } from 'react';

import { Card, Title, Loader } from '../components/UI';
import { uploads } from '../utils/api';

const Partners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const request = await uploads.get('/partners/list.json', true);

    setPartners(request.data);
  };

  return (
    <div id="partners">
      <Title align="center" className="uppercase">
        Partenaires
      </Title>

      <div className="partners-list">
        {!partners ? (
          <Loader />
        ) : (
          partners.map(({ name, description, image, link }) => (
            <div className="partner" key={link}>
              <Card
                imgSrc={image}
                className="partner-card"
                classNameImg="partner-img"
                content={<p>{description}</p>}
                href={link}
                target="_blank"
                alt={`Partenaire ${name}`}
                buttonContent={
                  <>
                    Visiter leur site
                    <i className="fas fa-chevron-right right-arrow" />
                  </>
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Partners;
