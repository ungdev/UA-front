import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { Button } from './UI';
import LoginModal from './LoginModal';

import { setLoginModalVisible } from '../modules/loginModal';

import { logout } from '../modules/login';

import './Navbar.css';

const isConected = true;

const links = [
  {
    title: 'Accueil',
    href: '/',
  },
  {
    title: 'Informations',
    href: '/information',
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
  const router = useRouter();
  const shortPath = router.pathname.match(/(\/[a-z]*)/)[0];

  // Is the mobile menu visible ?
  const [mobileMenuVisible, _setMobileMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.loginModal.visible);

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
        <div className={`nav-button ${link.href === shortPath ? 'active' : ''}`}>{link.title}</div>
      </a>
    </Link>
  ));

  // Logout and return to index
  const disconnect = () => {
    dispatch(logout);
  };

  // Connexion/Dashboard buttons
  const connexionButton = <Button primary className="login-button" onClick={() => dispatch(setLoginModalVisible(true))}>Connexion</Button>;
  const isLoggediInLayout = (
  <>
    <text className="pseudo">Pseudo</text>
    <Button className="logout-button" onClick={() => disconnect()}>Disconnect</Button>
    <Button primary className="login-button" onClick={() => router.push("/dashboard")}>Dashboard</Button>
  </>);
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
        <a className="desktop-link">
          <div className="desktop-logo" />
        </a>
      </Link>

      <div className="navbar-container">
        <SimpleBar style={{ height: '100%' }}>
          { isConected ? isLoggediInLayout : connexionButton }

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
            © 2019 <a href="https://ung.utt.fr">UTT Net Group</a>
            {' - '}
            <Link href="/legal"><a onClick={() => setMobileMenuVisible(false)}>Mentions légales</a></Link>
          </div>
        </div>
      </div>

      <LoginModal isVisible={isVisible} />
    </div>
  );
};

export default Navbar;