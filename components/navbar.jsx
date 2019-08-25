import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Modal from './UI/modal';
import './navbar.css';

const links = [
  {
    title: 'Accueil',
    href: '/',
  },
  {
    title: 'Informations',
    href: '/informations',
  },
  {
    title: 'Photos',
    href: '/photos',
  },
  {
    title: 'Tournois',
    href: '/tournaments',
  },
  {
    title: 'FAQ',
    href: '/faq',
  },
  {
    title: 'Partenaires',
    href: '/partners',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

const Navbar = () => {
  const { pathname } = useRouter();

  // Is the mobile menu visible ?
  const [visible, setVisible] = useState(false);

  // Is the login modal visible ?
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  // Create navigation links
  const navLinks = links.map((link) => (
    <Link href={link.href} key={link.href}>
      <a onClick={() => setVisible(false)}>
        <div className={`nav-button ${link.href === pathname ? 'active' : ''}`}>{link.title}</div>
      </a>
    </Link>
  ));

  // Toggle mobile menu visibility
  const toggleVisible = () => {
    setVisible(!visible);

    if (visible) {
      document.getElementsByTagName('html')[0].style.overflow = null;
    }
    else {
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }
  };

  return (
    <div id="navbar" className={visible ? 'active' : ''}>
      <div className="navbar-hamburger" onClick={toggleVisible}>
        <span />
        <span />
        <span />
      </div>

      <a href="/" className="mobile-link">
        <div className="mobile-logo" />
      </a>

      <a href="/" className="centered">
        <div className="desktop-logo" />
      </a>

      <div className="navbar-container">
        <div className="login-button">
          <button type="button" onClick={() => setLoginModalVisible(true)}>Connexion</button>
        </div>

        { navLinks }

        <div className="footer">
          <div className="social-links">
            <a href="https://www.facebook.com/UTTArena" className="facebook-link"><i className="fab fa-facebook-f" /></a>
            <a href="https://twitter.com/UTTArena" className="twitter-link"><i className="fab fa-twitter" /></a>
            <a href="https://discord.gg/WhxZwKU" className="discord-link"><i className="fab fa-discord" /></a>
            <a href="https://www.youtube.com/user/UTTNetGroup/" className="youtube-link"><i className="fab fa-youtube" /></a>
            <a href="https://www.twitch.tv/uttarena" className="twitch-link"><i className="fab fa-twitch" /></a>
          </div>

          <div className="footer-text">
            © 2019
            {' '}
            <a href="https://ung.utt.fr">UTT Net Group</a>
            {' - '}
            <Link href="/legal"><a>Mentions légales</a></Link>
          </div>
        </div>
      </div>

      <Modal
        title="Titre"
        visible={loginModalVisible}
        onCancel={() => setLoginModalVisible(false)}
        onOk={() => setLoginModalVisible(false)}
      >
        Contenu de la fenêtre
      </Modal>
    </div>
  );
};

export default Navbar;