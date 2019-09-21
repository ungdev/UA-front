import React from 'react';

import { Tournament } from '../../components/UI';
import tournamentsText from '../../assets/tournaments';

const LoLpro = () => (
  <Tournament
    imgSrc="/static/lolpro.webp"
    text={tournamentsText.lolpro}
  />
);

export default LoLpro;
