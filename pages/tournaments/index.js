import React from 'react';

import { Header } from '../../components';
import { TournamentCards } from '../../components/UI';

const Tournaments = () => (
  <>
    <Header />

    <div id="tournaments" className="page-padding">
      <TournamentCards />
    </div>
  </>
);

export default Tournaments;
