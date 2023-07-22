import React from 'react';
import logo from '../../public/logo.png';
import Navbar from './Navbar';
import Button from './UI/Button';

const Header = () => (
  <header id="header">
    <div className="left">
      <img src={logo.src} alt="Logo UA23" />
      <Navbar />
    </div>
    <div className="right">
      <Button className="about">A propos</Button>
      <Button primary className="connection">
        Connexion
      </Button>
    </div>
  </header>
);

export default Header;
