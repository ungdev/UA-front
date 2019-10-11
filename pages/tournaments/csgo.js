import React from 'react';

import { Tournament } from '../../components';
import tournamentsText from '../../assets/tournaments';

const CSGO = () => (
  <Tournament
    imgSrc="/static/csgo.webp"
    text={tournamentsText.csgo}
    idTournament={4}
  />
);

export default CSGO;