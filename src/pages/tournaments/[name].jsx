import React from 'react';
import { useRouter } from 'next/router';

import Tournament from '../../components/Tournament';
import tournaments from '../../utils/tournaments';

const TournamentPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const tournament = tournaments.find((tournament) => tournament.shortName === name);

  if (!tournament) {
    router.replace('/tournaments');
    return null;
  }

  return <Tournament assets={tournament} />;
};

export default TournamentPage;
