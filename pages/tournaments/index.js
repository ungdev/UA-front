import React from 'react';
import { CardsTournaments, Header } from '../../components';

import './index.css';

const Tournaments = () => (
  <div>
    <Header />
    <div id="tournaments">
      <CardsTournaments />
    </div>
  </div>
);

export default Tournaments;
