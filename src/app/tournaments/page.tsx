'use client';
import Button from '@/components/UI/Button';
import { useEffect, useState } from 'react';
import { Title } from '@/components/UI';
import Link from 'next/link';
import { tournaments } from '@/lib/tournaments';
import Divider from '@/components/UI/Divider';

const TournamentHome = () => {
  const fadeDuration = 200;
  //const dispatch = useAppDispatch();
  //const tournaments = useAppSelector((state) => state.tournament.tournaments);
  const [selectedTournamentIndex, setSelectedTournamentIndex] = useState(0);
  //const [removeFadeAt, setRemovedFadeAt] = useState(0);
  const [lastFading, setLastFading] = useState(Date.now());
  const [renderedTournamentIndex, setRenderedTournamentIndex] = useState(0);
  // Only used for force-updating the component
  const [updater, setUpdater] = useState(false);

  useEffect(() => {
    if (!tournaments) {
      //dispatch(fetchTournaments());
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setUpdater(!updater); // Force-update the component
    }, fadeDuration);
  }, [selectedTournamentIndex]);

  const selectTournament = (i) => {
    if (i === selectedTournamentIndex) return;
    setSelectedTournamentIndex(i);
    setLastFading(Date.now());
  };

  const selectedTournament = tournaments[selectedTournamentIndex];

  const fading = Date.now() - lastFading < fadeDuration;
  if (!fading && renderedTournamentIndex !== selectedTournamentIndex) {
    setRenderedTournamentIndex(selectedTournamentIndex);
    document.documentElement.style.setProperty(
      '--background-image',
      `url("${tournaments[selectedTournamentIndex].backgroundImage}")`,
    );
  }

  return (
    <div className={`tournament-container ${fading ? 'fading' : ''}`}>
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
                  onClick={() => selectTournament(i)}
                />
              ))}
        </div>
        <div className="tournament-info">
          <h2>{selectedTournament.name}</h2>
          <p>
            <strong>{selectedTournament.cashprize}€</strong> de cashprize ·{' '}
            <strong>{selectedTournament.maxPlayers / selectedTournament.playersPerTeam} équipes </strong>
            <br />
          </p>
          <p>
            Casté par <strong>{selectedTournament.caster}</strong>
          </p>
          <Link href={`/tournaments/${selectedTournament.id}`} scroll={false}>
            <Button isPink>Plus d'infos</Button>
          </Link>
          <Link href={`/dashboard`} scroll={false}>
            <Button isPink primary>
              S'inscrire
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentHome;
