import React from 'react';
import Link from 'next/link';
import logo from '../../public/logo.png';
import Navbar from './Navbar';
import Button from './UI/Button';

const Header = () => (
  <header id="header">
    <div className="left">
      <Link href="/">
        <img src={logo.src} alt="Logo UA23" />
      </Link>
      <Navbar />
    </div>
    <div className="right">
      <Link href="/">
        <Button className="about">A propos</Button>
      </Link>
      
      <Button primary className="connection">
        Connexion
      </Button>
    </div>
  </header>
);

export default Header;
