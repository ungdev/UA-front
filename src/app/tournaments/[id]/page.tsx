'use client';
import { TournamentInformation } from '@/app/tournaments/[id]/content';
import { useParams } from 'next/navigation';

export default function DefaultTournamentInformation() {
  const params = useParams();
  return <TournamentInformation tournamentId={params.id as string} />;
}
