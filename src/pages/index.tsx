import React from 'react';
import { LogoSVG } from '../components/UI';

const Home = () => {
  return (
    <div id="home">
      <div className="home-header">
        <div id="logo">
          <LogoSVG />
        </div>
        <div className="home-title">
          <p className="main">L'UTT Arena revient</p>
          <p>les 2, 3 et 4 décembre 2022 !</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
