import React from 'react';

import { Tournament } from '../../components/UI';
import tournamentsText from '../../assets/tournaments';

const Fortnite = () => (
  <Tournament
    imgSrc="/static/fortnite.webp"
    text={tournamentsText.fortnite}
  />
);

export default Fortnite;