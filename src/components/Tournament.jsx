import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setLoginModalVisible } from '../modules/loginModal';
import { Button, Title } from './UI';
import { API } from '../utils/api';

const columns = [
  { title: 'Équipe', key: 'name' },
  { title: 'Joueurs', key: 'players' },
];

const Tournament = ({ assets, tournamentId }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formatTeams, setFormatTeam] = useState([]);

  const fetchFullTeam = async () => {
    const res = await API.get(`tournaments/${tournamentId}/teams?paidOnly=true`);
    const teams = res.data.map(({ name, users }) => ({
      name,
      players: users.map(({ username }) => username).join(', '),
    }));
    setFormatTeam(teams);
  };

  useSelector((state) => {
    if (isLoggedIn !== !!state.login.user) {
      setIsLoggedIn(!!state.login.user);
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchFullTeam();
    }
  }, [isLoggedIn]);

  const buttonClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      dispatch(setLoginModalVisible(true));
    }
  };

  return (
    <div className="tournament">
      <img className="tournament-header" alt="" src={assets.image} />

      <div className="tournament-content">
        <Title align="center">{assets.name}</Title>

        <div className="tournament-signin">
          <a href={`https://www.toornament.com/fr/tournaments/${assets.toornamentId}/information`}>
            <Button primary>S'inscrire</Button>
          </a>
        </div>

        <Title level={2}>Format</Title>
        <div className="tournament-section">
          <strong>{assets.format}</strong>
        </div>

        <Title level={2}>Récompenses</Title>
        <div className="tournament-section">
          <p>{assets.rewards}</p>
        </div>

        <Title level={2}>Règlement</Title>
        {!assets.rules ? (
          'Le règlement sera bientôt disponible.'
        ) : (
          <>
            <div className="tournament-section">
              <a href={assets.rules} target="_blank" rel="noopener noreferrer">
                Le règlement est disponible ici.
              </a>
            </div>
          </>
        )}
        {assets.toornamentId &&
          assets.stages &&
          assets.stages.map((stage) => (
            <iframe
              key={stage}
              width="100%"
              height="500"
              src={`https://widget.toornament.com/tournaments/${assets.toornamentId}/stages/${stage}/?_locale=fr`}
              allowFullscreen
              frameBorder="0"
            />
          ))}
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
};

Tournament.defaultProps = {
  isSolo: false,
};

export default Tournament;
