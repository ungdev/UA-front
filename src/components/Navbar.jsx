import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';

import { Button, Modal } from './UI';
import LoginModal from './LoginModal';
import UserModal from './UserModal';
import { setLoginModalVisible } from '../modules/loginModal';

import { logout } from '../modules/login';
import { hasOrgaPermission as _hasOrgaPermission } from '../utils/permission';
import { isLoginAllowed as isLoginAllowedFunction } from '../utils/settings';

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
  // {
  //   title: 'Organisateurs',
  //   href: '/organisers',
  // },
  {
    title: 'Contact',
    href: '/contact',
  },
];

const Navbar = ({ isLoggedIn }) => {
  const router = useRouter();
  const shortPath = router.pathname.match(/(\/[a-z]*)/)[0];

  // Is the mobile menu visible ?
  const [mobileMenuVisible, _setMobileMenuVisible] = useState(false);

  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.loginModal.visible);
  const isUserVisible = useSelector((state) => state.userEntry.visible);
  const username = useSelector((state) => state.login.user && state.login.user.username);
  const hasOrgaPermission = useSelector(
    (state) => state.login.user && _hasOrgaPermission(state.login.user.permissions),
  );
  const [isLoginAllowed, setIsLoginAllowed] = useState(false);
  isLoginAllowedFunction().then((result) => {
    setIsLoginAllowed(result);
  });

  // Set mobile menu visibility
  const setMobileMenuVisible = (visible) => {
    if (window.innerWidth <= 1000) {
      _setMobileMenuVisible(visible);
      if (visible) {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      } else {
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

  // Connexion/Dashboard buttons
  const connexionButton = (
    <Button primary className="login-button" onClick={() => dispatch(setLoginModalVisible(true))}>
      Connexion
    </Button>
  );

  const isLoggedLayout = (
    <div className="logged">
      <p className="logged-info">
        <span className="logged-username">{username}</span>

        <a
          tabIndex="0"
          className="logout"
          onClick={() => {
            dispatch(logout);
            setMobileMenuVisible(false);
          }}>
          Déconnexion
        </a>
      </p>
      <Button
        primary
        className="dashboard-button"
        onClick={() => {
          router.push(hasOrgaPermission ? '/admin' : '/dashboard');
          setMobileMenuVisible(false);
        }}>
        {hasOrgaPermission ? 'Admin' : 'Dashboard'}
      </Button>
    </div>
  );

  return (
    <div id="navbar" className={mobileMenuVisible ? 'active' : ''}>
      <div className="navbar-hamburger" onClick={() => setMobileMenuVisible(!mobileMenuVisible)}>
        <span />
        <span />
        <span />
      </div>
      <Link href="/">
        <a className="mobile-link" arial-label="logo" onClick={() => setMobileMenuVisible(false)}>
          <div className="mobile-logo" />
        </a>
      </Link>
      <div className="navbar-container">
        <SimpleBar style={{ height: '100%' }}>
          <Link href="/">
            <a className="desktop-link" aria-label="logo">
              <div className="desktop-logo" />
            </a>
          </Link>

          <a>
            <Button primary className="login-button" onClick={() => dispatch(setLoginModalVisible(true))}>
              Inscription
            </Button>
          </a>
          <nav>{navLinks}</nav>
        </SimpleBar>

        <footer>
          <div className="social-links">
            <a
              href="https://www.facebook.com/UTTArena"
              className="facebook-link"
              aria-label="Page Facebook"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://twitter.com/UTTArena"
              className="twitter-link"
              aria-label="Page Twitter"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-twitter" />
            </a>
            <a
              href="https://www.instagram.com/uttarena/"
              className="instagram-link"
              aria-label="Page Instagram"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://discord.gg/WhxZwKU"
              className="discord-link"
              aria-label="Serveur Discord"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-discord" />
            </a>
            <a
              href="https://www.youtube.com/user/UTTNetGroup/"
              className="youtube-link"
              aria-label="Chaîne Youtube"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-youtube" />
            </a>
            <a
              href="https://www.twitch.tv/uttarena"
              className="twitch-link"
              aria-label="Chaîne Twitch"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-twitch" />
            </a>
          </div>

          <div className="footer-text">
            © 2021 <a href="https://ung.utt.fr">UTT Net Group</a>
            {' - '}
            <Link href="/legal">
              <a onClick={() => setMobileMenuVisible(false)}>Mentions légales</a>
            </Link>
          </div>
        </footer>
      </div>
      {isLoginAllowed ? (
        <LoginModal isVisible={isVisible} />
      ) : (
        <Modal
          title="Connexion"
          onCancel={() => dispatch(setLoginModalVisible(false))}
          visible={isVisible}
          buttons={
            <Button primary onClick={() => dispatch(setLoginModalVisible(false))}>
              Fermer
            </Button>
          }>
          Les inscriptions ouvriront le Vendredi 8 Octobre 2021 à 19h.
        </Modal>
      )}
      <UserModal isVisible={isUserVisible} />
    </div>
  );
};

Navbar.propTypes = {
  /**
   * Is the user logged in ?
   */
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
