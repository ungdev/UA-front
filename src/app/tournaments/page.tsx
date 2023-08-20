'use client';
import { TournamentHome } from '@/app/tournaments/content';
import { useRouter, useSearchParams } from 'next/navigation';

const TournamentHomeDefault = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <TournamentHome
      animations={searchParams.get('firstAnimation') === 'false' ? 'except-first' : 'all'}
      defaultTournamentId={searchParams.get('tournament') as string | undefined}
      onDefaultTournamentSet={() =>
        setTimeout(() => window.history.replaceState({}, '', window.location.pathname), 500)
      }
      scroll={searchParams.get('scroll') === 'true'}
      onScrolled={() => setTimeout(() => router.replace(window.location.pathname), 500)}
    />
  );
};

export default TournamentHomeDefault;
