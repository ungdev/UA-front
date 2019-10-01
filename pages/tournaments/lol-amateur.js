import React from 'react';

import { Tournament } from '../../components';
import tournamentsText from '../../assets/tournaments';

const LoLamateur = () => (
  <Tournament
    imgSrc="/static/lolamateur.webp"
    text={tournamentsText.lolamateur}
  />
);

export default LoLamateur;
