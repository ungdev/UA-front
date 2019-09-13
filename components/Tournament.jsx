import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Title from './UI/Title';
import Button from './UI/Button';

import './Tournament.css';
import { setVisible } from '../modules/loginModal';

const Tournament = ({ bgImg, text }) => {
  const dispatch = useDispatch();
  return (
    <div className="tournament">
      <img className="tournament-header" alt="" src={bgImg} />
      <div className="tournament-content">
        <Title align="center" uppercase>{text.title}</Title>
        <div className="tournament-signin">
          <Button primary onClick={() => dispatch(setVisible(true))}>S&apos;inscrire</Button>
        </div>
        <Title level={2}>Format</Title>
        {text.format}
        <Title level={2}>Cashprize</Title>
        <p>Informations à venir.</p>
        <Title level={2}>Réglement</Title>
        <div className="tournament-rules">
          <p>
            Informations à venir.
          </p>
        </div>
        <Title level={2}>Equipes inscrites</Title>
        <p>
          Les inscriptions ne sont pas encore ouvertes !
        </p>
      </div>
    </div>
  );
};

Tournament.propTypes = {
  bgImg: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
};

export default Tournament;
