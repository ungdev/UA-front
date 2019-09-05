import React from 'react';
import { Title } from '../components';

import text from '../assets/text';
import './legal.css';

const Legal = () => (
  <div id="legal">
    <Title align="center">mentions légales</Title>
    <Title level={2}>Propriétaire du site</Title>
    {text.legal.ung}
    <Title level={2}>Hébergeur du site</Title>
    {text.legal.ung}
    <Title level={2}>Informations relatives aux cookies</Title>
    <p>{text.legal.cookies}</p>
    <Title level={2}>Conditions d&apos;accès aux systèmes informatiques</Title>
    <p>{text.legal.acces}</p>
    <Title level={2}>Conditions générales de vente</Title>
    <div>
      {text.legal.vente.map(({ title, content }) => (
        <>
          <Title level={3}>{title}</Title>
          <p>{content}</p>
        </>
      ))}
    </div>
  </div>
);

export default Legal;
