import React from 'react';

import { Tournament } from '../../components';
import tournamentsText from '../../assets/tournaments';

const osu = () => (
  <Tournament
    imgSrc="/static/osu.webp"
    text={tournamentsText.osu}
  />
);

export default osu;