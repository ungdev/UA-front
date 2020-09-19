import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setLoginModalVisible } from '../modules/loginModal';
import { Button, Title, Table } from './UI';
import { API } from '../utils/api';

const columns = [
  { title: 'Équipe', key: 'name' },
  { title: 'Joueurs', key: 'players' },
];

const Tournament = ({ assets, isSolo, tournamentId }) => {
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
        <Title align="center">{assets.title}</Title>

        <div className="tournament-signin">
          <Button primary onClick={buttonClick}>
            S'inscrire
          </Button>
        </div>

        <Title level={2}>Format</Title>
        <div className="tournament-section">{assets.format}</div>

        {assets.rewards && (
          <>
            <Title level={2}>Récompenses</Title>
            <div className="tournament-section">{assets.rewards}</div>
          </>
        )}

        {assets.rules && (
          <>
            <Title level={2}>Règlement</Title>
            <div className="tournament-section">
              <a href={assets.rules} target="_blank" rel="noopener noreferrer">
                Le règlement est disponible ici.
              </a>
            </div>
          </>
        )}
        {assets.toornamentId &&
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
        <Title level={2}>{isSolo ? 'Joueurs inscrits' : 'Équipes inscrites'}</Title>
        {isLoggedIn ? (
          <Table
            columns={isSolo ? [{ title: 'Joueur', key: 'players' }] : columns}
            dataSource={formatTeams}
            className="table-tournament"
          />
        ) : (
          <p>Connectez vous pour afficher les équipes</p>
        )}
      </div>
    </div>
  );
};

Tournament.propTypes = {
  /**
   * The assets of the tournament
   */
  assets: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
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
