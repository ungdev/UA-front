import React from 'react';

import { Tournament } from '../../components';
import tournamentsText from '../../assets/tournaments';

const SSBU = () => (
  <Tournament
    imgSrc="/static/ssbu.webp"
    text={tournamentsText.ssbu}
  />
);

export default SSBU;