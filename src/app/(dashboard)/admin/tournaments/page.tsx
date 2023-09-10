'use client';
import { Square, Title } from '@/components/UI';
import TournamentModal from '@/components/dashboard/TournamentModal';
import { useAppSelector } from '@/lib/hooks';
import { AdminTournament } from '@/types';
import { getTournamentImageLink } from '@/utils/uploadLink';
import { useState } from 'react';
import styles from './style.module.scss';

const Tournaments = () => {
  const tournaments = useAppSelector((state) => state.admin.tournaments);
  const [selectedTournament, setSelectedTournament] = useState<AdminTournament | null>(null);
  const [createNewTournament, setCreateNewTournament] = useState(false);

  return (
    <div className={styles.tournaments}>
      <Title>Tournois</Title>

      <div className={styles.squareContainer}>
        {tournaments?.map((tournament, index) => (
          <Square
            key={index}
            imgSrc={getTournamentImageLink(tournament.id)}
            alt={tournament.name}
            onClick={() => setSelectedTournament(tournament)}
          />
        ))}
      </div>

      {(selectedTournament !== null || createNewTournament) && (
        <TournamentModal
          tournament={selectedTournament}
          onClose={() => {
            setSelectedTournament(null);
            setCreateNewTournament(false);
          }}
        />
      )}
    </div>
  );
};

export default Tournaments;
