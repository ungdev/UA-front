import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'simplebar/dist/simplebar.min.css';
import Modal from './UI/Modal';
import './Navbar.css';

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
  const [mobileMenuVisible, _setMobileMenuVisible] = useState(false);

  // Is the login modal visible ?
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  // Set mobile menu visibility
  const setMobileMenuVisible = (visible) => {
    if (window.innerWidth <= 1000) {
      _setMobileMenuVisible(visible);

      if (visible) {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      }
      else {
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
      }
    }
  };

  // Create navigation links
  const navLinks = links.map((link) => (
    <Link href={link.href} key={link.href}>
      <a onClick={() => setMobileMenuVisible(false)}>
        <div className={`nav-button ${link.href === pathname ? 'active' : ''}`}>{link.title}</div>
      </a>
    </Link>
  ));

  return (
    <div id="navbar" className={mobileMenuVisible ? 'active' : ''}>
      <div className="navbar-hamburger" onClick={() => setMobileMenuVisible(!mobileMenuVisible)}>
        <span />
        <span />
        <span />
      </div>

      <Link href="/">
        <a className="mobile-link" onClick={() => setMobileMenuVisible(false)}>
          <div className="mobile-logo" />
        </a>
      </Link>

      <Link href="/">
        <a className="centered">
          <div className="desktop-logo" />
        </a>
      </Link>

      <div className="navbar-container">
        <SimpleBar style={{ height: '100%' }}>
          <div className="login-button">
            <button type="button" onClick={() => setLoginModalVisible(true)}>Connexion</button>
          </div>

          { navLinks }

        </SimpleBar>
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
            <Link href="/legal"><a onClick={() => setMobileMenuVisible(false)}>Mentions légales</a></Link>
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