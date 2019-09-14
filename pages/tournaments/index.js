import React from 'react';

import { TournamentCards, Header } from '../../components';

const Tournaments = () => (
  <>
    <Header />

    <div id="tournaments" className="page-padding">
      <TournamentCards />
    </div>
  </>
);

export default Tournaments;
