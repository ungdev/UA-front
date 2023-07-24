'use client'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/UI/Button';
import { useEffect, useState } from 'react';
import { fetchTournaments } from '@/modules/tournament';
import { Title } from '@/components/UI';

const TournamentHome = () => {
  const dispatch = useDispatch();
  //const tournaments = useSelector((state) => state.tournament.tournaments);
  const tournaments = [
    {
      id: 'tft',
      name: 'Teamfight Tactics',
      cashprize: 1600,
      maxPlayers: 80,
      playersPerTeam: 5,
      image: 'https://arena.utt.fr/tournaments/tft.jpg',
      backgroundImage: 'https://arena.utt.fr/tournaments/tft.jpg',
    },
    {
      id: 'csgo',
      name: 'Counter-Strike: Global Offsensive',
      cashprize: 1600,
      maxPlayers: 80,
      playersPerTeam: 5,
      image: 'https://arena.utt.fr/tournaments/csgo.jpg',
      backgroundImage: '../../../tournaments/csgo-background.png',
    },
  ];
  const [selectedTournamentIndex, setSelectedTournamentIndex] = useState(0);

  useEffect(() => {
    if (!tournaments) {
      //dispatch(fetchTournaments());
    }
  }, []);

  const backgroundGradient =
    'linear-gradient(180deg, rgba(1, 3, 7, 0.73) 0%, rgba(11, 15, 24, 0.56) 41.15%, rgba(11, 15, 24, 0.00) 89.34%)';

  const selectedTournament = tournaments[selectedTournamentIndex];

  return (
    <div className="tournaments">
      <div className="top-container">
        <div className="top">
          <Title level={1} align={"center"}>Forme ton équipe et hisse-toi vers la victoire ultime dans un tournoi !</Title>
          <div className="text">
            Rejoins-nous dès maintenant pour vivre une expérience inoubliable, où l'amitié, la stratégie, et l'adrénaline
            se mêlent pour créer des souvenirs inégalables. C'est l'occasion parfaite de mettre en avant tes talents, de
            relever des défis palpitants et de créer des liens durables avec des coéquipiers passionnés.
          </div>
          <div className="buttons">
            <Button isPink primary>
              Découvrir les tournois
            </Button>
            <Button isPink primary>
              Se connecter
            </Button>
          </div>
        </div>
      </div>
      <div
        className="tournaments-part"
        style={{
          background: `${backgroundGradient}, url("${selectedTournament.backgroundImage}")`,
        }}>
        <Title>Tournois</Title>
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
            {selectedTournament.maxPlayers / selectedTournament.playersPerTeam} <br />
            Casté par {selectedTournament.caster}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentHome;