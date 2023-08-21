'use client';
import { Card } from '@/components/UI';
import TournamentModal from '@/components/dashboard/TournamentModal';
import { useAppSelector } from '@/lib/hooks';
import { AdminTournament } from '@/types';
import { getTournamentImageLink } from '@/utils/uploadLink';
import { useState } from 'react';

const Tournaments = () => {
  const tournaments = useAppSelector((state) => state.admin.tournaments);
  const [selectedTournament, setSelectedTournament] = useState<AdminTournament | null>(null);
  const [createNewTournament, setCreateNewTournament] = useState(false);

  return (
    <>
      {tournaments?.map((tournament, index) => (
        <div key={index} onClick={() => setSelectedTournament(tournament)}>
          <Card>
            <img src={getTournamentImageLink(tournament.id)} alt={tournament.name} />
          </Card>
        </div>
      ))}

      {(selectedTournament !== null || createNewTournament) && (
        <TournamentModal
          tournament={selectedTournament}
          onClose={() => {
            setSelectedTournament(null);
            setCreateNewTournament(false);
          }}
        />
      )}
    </>
  );
};

export default Tournaments;
