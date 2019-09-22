import React from 'react';

import { Title } from '../components/UI';
import legalText from '../assets/legal';

import './legal.css';

const Legal = () => (
  <div id="legal">
    <Title align="center" uppercase>Mentions légales</Title>

    <Title level={2}>Propriétaire et hébergeur du site</Title>
    {legalText.ung}

    <Title level={2}>Informations relatives aux cookies</Title>
    {legalText.cookies}

    <Title level={2}>Conditions d'accès aux systèmes informatiques</Title>
    {legalText.access}

    <Title level={2}>Conditions générales de vente</Title>
    {legalText.sales}
  </div>
);

export default Legal;
