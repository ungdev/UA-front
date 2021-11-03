import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setLoginModalVisible } from '../modules/loginModal';
import { Button, Title, Table } from './UI';
import { isLoginAllowed as fetchIsLoginAllowed } from '../utils/settings';
import { API } from '../utils/api';

const columns = [
  { title: 'Équipe', key: 'name' },
  { title: 'Joueurs', key: 'players' },
];

const Tournament = ({ assets, tournamentId, alt }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoginAllowed, setIsLoginAllowed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formatTeams, setFormatTeam] = useState([]);
  const [tournament, setTournament] = useState();

  fetchIsLoginAllowed().then((result) => {
    setIsLoginAllowed(result);
  });

  // Fetch the tournaments from the API, and update the state with the tournament object and a map of locked teams / players
  const fetchTournament = async () => {
    const res = await API.get(`/tournaments`);
    const tournament = res.data.filter((tournament) => tournament.id === tournamentId);
    const teams = tournament[0].teams
      .filter((team) => team.lockedAt !== null)
      .map(({ name, players }) => ({
        name,
        players: players
          .map(({ username }) => username)
          .sort()
          .join(', '),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    setTournament(tournament[0]);
    setFormatTeam(teams);
  };

  useSelector((state) => {
    if (isLoggedIn !== !!state.login.user) {
      setIsLoggedIn(!!state.login.user);
    }
  });

  // Fetch the tournaments once, after the first render
  useEffect(() => {
    if (!tournament) {
      fetchTournament();
    }
  }, []);

  const buttonClick = () => {
    if (isLoggedIn) {
      router.push(`/dashboard/register?tournamentId=${tournamentId}`);
    } else {
      dispatch(setLoginModalVisible(true));
    }
  };

  return (
    <div className="tournament">
      <img className="tournament-header" alt={alt} src={assets.image} />

      <div className="tournament-content">
        <Title align="center">{assets.name}</Title>

        {/* Redirect to tournament register. The button is only display if Login is allowed (api call). */}
        {isLoginAllowed ? (
          <div className="tournament-signin">
            <Button primary onClick={buttonClick}>
              S'inscrire
            </Button>
          </div>
        ) : null}

        <Title level={2}>Format</Title>
        <div className="tournament-section">
          <strong>{assets.format}</strong>
        </div>

        <Title level={2}>Récompenses</Title>
        <div className="tournament-section">
          <p>{assets.rewards}</p>
        </div>

        <Title level={2}>Liens utiles</Title>
        <div className="tournament-section">
          <ul>
            {!assets.rules ? (
              <li>Le règlement sera bientôt disponible.</li>
            ) : (
              <li>
                <a href={assets.rules} target="_blank" rel="noopener noreferrer">
                  Règlement du tournoi
                </a>
              </li>
            )}
            {assets.toornamentId && (
              <li>
                <a
                  href={`https://play.toornament.com/fr/tournaments/${assets.toornamentId}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  Page Toornament
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* If tournament is defined (if the fetch has finished and succeeded) then render a table with the list of the validated players / teams */}
        {tournament ? (
          <>
            <Title level={2}>
              {tournament.playersPerTeam === 1 ? 'Joueurs inscrits' : 'Équipes inscrites'} (
              {tournament.lockedTeamsCount}/{tournament.lockedTeamsCount + tournament.placesLeft})
            </Title>
            <Table
              columns={tournament.playersPerTeam === 1 ? [{ title: 'Joueurs', key: 'players' }] : columns}
              dataSource={formatTeams}
              className="table-tournament"
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

Tournament.propTypes = {
  /**
   * The assets of the tournament
   */
  assets: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    format: PropTypes.node.isRequired,
    rewards: PropTypes.node,
    rules: PropTypes.node,
    toornamentId: PropTypes.string,
    stages: PropTypes.array,
  }).isRequired,
  /**
   * Is tournament solo?
   */
  isSolo: PropTypes.bool,
  /**
   * Tournament id
   */
  tournamentId: PropTypes.string.isRequired,
  /**
   * alt
   */
  alt: PropTypes.string,
};

Tournament.defaultProps = {
  isSolo: false,
  alt: '',
};

export default Tournament;
