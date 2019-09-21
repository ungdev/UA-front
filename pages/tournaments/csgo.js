import React from 'react';

import { Tournament } from '../../components/UI';
import tournamentsText from '../../assets/tournaments';

const CSGO = () => (
  <Tournament
    imgSrc="/static/csgo.webp"
    text={tournamentsText.csgo}
  />
);

export default CSGO;