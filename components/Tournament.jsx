import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { setVisible } from '../modules/loginModal';
import Title from './UI/Title';
import Button from './UI/Button';

import './Tournament.css';

const Tournament = ({ imgSrc, text }) => {
  const dispatch = useDispatch();
  return (
    <div className="tournament">
      <img className="tournament-header" alt="" src={imgSrc} />

      <div className="tournament-content">
        <Title align="center" uppercase>{text.title}</Title>

        <div className="tournament-signin">
          <Button primary onClick={() => dispatch(setVisible(true))}>S'inscrire</Button>
        </div>

        <Title level={2}>Format</Title>
        <div className="tournament-section">{text.format}</div>

        <Title level={2}>Récompenses</Title>
        <div className="tournament-section">{text.rewards}</div>

        <Title level={2}>Règlement</Title>
        <div className="tournament-section">{text.rules}</div>
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
    rewards: PropTypes.node.isRequired,
    rules: PropTypes.string.isRequired,
  }).isRequired,
};

export default Tournament;
