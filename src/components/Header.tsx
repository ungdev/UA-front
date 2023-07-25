import React from 'react';
import Link from 'next/link';
import logo from '../../public/images/logo.png';
import Navbar from './Navbar';
import Button from './UI/Button';

/**
 * Header component that displays the logo, navigation bar, and buttons for about and login.
 * @returns JSX.Element
 */
export default function Header() {
  return (
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
}
