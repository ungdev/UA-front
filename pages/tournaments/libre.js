import React from 'react';

import { Tournament } from '../../components';
import tournamentsText from '../../assets/tournaments';

const Libre = () => (
  <Tournament
    imgSrc="/static/libre.webp"
    text={tournamentsText.libre}
    idTournament={7}
    isSolo
  />
);

export default Libre;