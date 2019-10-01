import React from 'react';

import HeaderText from '../assets/header';

import './Header.css';

const Header = () => (
  <header id="header">
    <div className="home-title">
      <p className="main">{HeaderText.title}</p>
      <p>{HeaderText.subtitle}</p>
    </div>
  </header>
);

export default Header;
