import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setLoginModalVisible } from '../modules/loginModal';
import { Button, Title } from './UI';

import './Tournament.css';

const Tournament = ({ imgSrc, text }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useSelector((state) => {
    if(isLoggedIn !== !!state.login.user) {
      setIsLoggedIn(!!state.login.user);
    }
  });

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
