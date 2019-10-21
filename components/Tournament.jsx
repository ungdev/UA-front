import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setLoginModalVisible } from '../modules/loginModal';
import { Button, Title, Table } from './UI';
import { API } from '../utils';

import './Tournament.css';

const columns = [
  { title: 'Équipe', key: 'name' },
  { title: 'Joueurs', key: 'players' },
];

const Tournament = ({ imgSrc, text, isSolo, idTournament }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formatTeams, setFormatTeam] = useState([]);

  const fetchFullTeam = async () => {
    const res = await API.get(`tournaments/${idTournament}/teams?paidOnly=true`);
    const teams = res.data.map(({ name, users }) => ({
      name,
      players: users.map(({ username }) => username).join(', '),
    }));
    setFormatTeam(teams);
  };

  useSelector((state) => {
    if(isLoggedIn !== !!state.login.user) {
      setIsLoggedIn(!!state.login.user);
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchFullTeam();
    }
  }, [isLoggedIn]);

  const buttonClick = () => {
    if(isLoggedIn) {
      router.push('/dashboard');
    }
    else {
      dispatch(setLoginModalVisible(true));
    }
  };

  return (
    <div className="tournament">
      <img className="tournament-header" alt="" src={imgSrc} />

      <div className="tournament-content">
        <Title align="center">{text.title}</Title>

        <div className="tournament-signin">
          <Button primary onClick={buttonClick}>S'inscrire</Button>
        </div>

        <Title level={2}>Format</Title>
        <div className="tournament-section">{text.format}</div>

        {text.rewards && (
          <>
            <Title level={2}>Récompenses</Title>
            <div className="tournament-section">{text.rewards}</div>
          </>
        )}

        { text.rules && (
          <>
            <Title level={2}>Règlement</Title>
            <div className="tournament-section">{text.rules}</div>
          </>
        )}
        <Title level={2}>{isSolo ? 'Joueurs inscrits' : 'Équipes inscrites'}</Title>
        { isLoggedIn ?
        <Table columns={isSolo ? [{ title: 'Joueur', key: 'players' }] : columns} dataSource={formatTeams} className="table-tournament"/> :
        <p>Connectez vous pour afficher les équipes</p>}
      </div>
    </div>
  );
};

Tournament.propTypes = {
  /**
   * The source of the image to display
   */
  imgSrc: PropTypes.string.isRequired,
  /**
   * The text that will be displayed on the page
   */
  text: PropTypes.shape({
    title: PropTypes.node.isRequired,
    format: PropTypes.node.isRequired,
    rewards: PropTypes.node,
    rules: PropTypes.node,
  }).isRequired,
  /**
   * Is tournament solo?
   */
  isSolo: PropTypes.bool,
  /**
   * Tournament id
   */
  idTournament: PropTypes.string.isRequired,
};

Tournament.defaultProps = {
  isSolo: false,
};

export default Tournament;
