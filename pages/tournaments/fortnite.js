import React from 'react';

import { Tournament } from '../../components';
import tournamentsText from '../../assets/tournaments';

const Fortnite = () => (
  <Tournament
    imgSrc="/static/fortnite.webp"
    text={tournamentsText.fortnite}
    idTournament={3}
  />
);

export default Fortnite;