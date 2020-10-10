import React from 'react';
import { useRouter } from 'next/router';

import Tournament from '../../components/Tournament';
import tournamentsAssets from '../../assets/tournaments';

const TournamentPage = () => {
  const router = useRouter();
  const { name } = router.query;

  if (!tournamentsAssets[name]) {
    router.replace('/tournaments');
    return null;
  }

  return <Tournament assets={tournamentsAssets[name]} />;
};

export default TournamentPage;
