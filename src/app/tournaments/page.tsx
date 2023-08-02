'use client';
import Button from '@/components/UI/Button';
import { useEffect, useState } from 'react';
import { Title } from '@/components/UI';
import Link from 'next/link';
import { tournaments } from '@/lib/tournaments';
import Divider from '@/components/UI/Divider';

const TournamentHome = () => {
  //const dispatch = useAppDispatch();
  //const tournaments = useAppSelector((state) => state.tournament.tournaments);
  const [selectedTournamentIndex, setSelectedTournamentIndex] = useState(0);

  useEffect(() => {
    if (!tournaments) {
      //dispatch(fetchTournaments());
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background-image',
      `url("${tournaments[selectedTournamentIndex].backgroundImage}")`,
    );
  }, [selectedTournamentIndex]);

  const selectedTournament = tournaments[selectedTournamentIndex];

  return (
    <>
      <div className="page-title">
        <Divider is_white />
        <Title align="center">Tournois</Title>
        <Divider is_white />
      </div>
      <div className="content">
        <div className="tournaments-list">
          {!tournaments
            ? 'Chargement des tournois...'
            : tournaments.map((tournament, i) => (
                <img
                  key={tournament.id}
                  src={tournament.image}
                  alt={`Logo ${tournament.name}`}
                  className={`tournament ${i === selectedTournamentIndex ? 'selected' : ''}`}
                  onClick={() => setSelectedTournamentIndex(i)}
                />
              ))}
        </div>
        <div className="tournament-info">
          <h2>{selectedTournament.name}</h2>
          {selectedTournament.cashprize}€ de cashprize ·{' '}
          {selectedTournament.maxPlayers / selectedTournament.playersPerTeam} équipes <br />
          Casté par {selectedTournament.caster} <br />
          <Link href={`/tournaments/${selectedTournament.id}`}>
            <Button isPink>Plus d'infos</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TournamentHome;
