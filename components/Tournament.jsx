import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Title from './UI/Title';
import Button from './UI/Button';

import './Tournament.css';
import { setVisible } from '../modules/loginModal';

const Tournament = ({ bgImg, text, reglement }) => {
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
        <p>{text.cashprize}</p>
        <Title level={2}>Réglement</Title>
        <div className="tournament-rules">
          <p>
            Chaque retard pourra être sanctionné à hauteur d’une perte de manche par
            tranche de 20 minutes de retard. Cet effet peut se répéter
          </p>
          <a href={reglement} target="blank">Réglement complet</a>
        </div>
      </div>
    </div>
  );
};

Tournament.propTypes = {
  bgImg: PropTypes.string.isRequired,
  reglement: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
};

export default Tournament;
