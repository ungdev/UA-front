'use client';
import { TournamentHome } from '@/app/tournaments/content';
import { useSearchParams } from 'next/navigation';

const TournamentHomeDefault = () => {
  const searchParams = useSearchParams();

  return (
    <TournamentHome
      animations={searchParams.get('firstAnimation') === 'false' ? 'except-first' : 'all'}
      defaultTournamentId={searchParams.get('tournament')}
      onDefaultTournamentSet={() => {
        window.history.replaceState({}, '', window.location.pathname);
      }}
    />
  );
};

export default TournamentHomeDefault;
