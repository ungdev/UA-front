import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import Title from '../../components/UI/Title';
import { useEffect } from 'react';
import { fetchTournaments } from '../../modules/tournament';

const TournamentHome = () => {
  const dispatch = useDispatch();
  const tournaments = useSelector((state) => state.tournament.tournaments);

  useEffect(async () => {
    if (!tournaments) {
      dispatch(fetchTournaments());
    }
  }, []);

  const generateTextBorderStyle = (size) => {
    const totalArraySize = (2 * size + 1) ** 2 - 1;
    const shadows = [...Array(totalArraySize).keys()].map((i) => {
      let y = i % (2 * size + 1);
      let x = (i - y) / (2 * size + 1);
      y -= size;
      x -= size;
      if ((x > 0 && y > 0) || (x === 0 && y === 0)) {
        x++;
        y++;
      }
      return `${x}px ${y}px 0 #000`;
    });
    return { textShadow: shadows.join(',') };
  };

  return (
    <div className="tournaments">
      <div className="top">
        <div className="title" style={generateTextBorderStyle(6)}>
          Forme ton équipe et hisse-toi vers la victoire ultime dans un tournoi !
        </div>
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
      <div className="tournaments-part">
        <Title>Tournois</Title>
        {!tournaments
          ? 'Chargement des tournois...'
          : tournaments.map((tournament) => <div key={tournament.name}>{tournament.name}</div>)}
      </div>
    </div>
  );
};

export default TournamentHome;
