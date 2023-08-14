'use client';
import Link from 'next/link';

import logo from '../../public/images/logo.png';
import LoginModal from './landing/LoginModal';
import { Button, Modal } from './UI';
import { setLoginModalVisible } from '@/modules/loginModal';
import type { Action } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Header component that displays the logo, navigation bar, and buttons for about and login.
 * @param connected Whether the user is connected or not.
 * @returns JSX.Element
 */
export default function Header({ connected = false }: { connected?: boolean }) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isLoginAllowed = useAppSelector((state) => state.settings.login);
  const isVisible = useAppSelector((state) => state.loginModal.visible);

  const closeBurger = () => {
    if (!isBurgerOpen) return;
    setIsBurgerOpen(false);
    return;
  };

  const leftContent = (
    <>
      <Link href="/" onClick={closeBurger}>
        <Button className={`home ${pathname && pathname === '/' && 'current'}`}>Accueil</Button>
      </Link>
      <Link href="/event" onClick={closeBurger}>
        <Button className={`event ${pathname && pathname === '/event' && 'current'}`}>Événement</Button>
      </Link>
      <Link href="/tournaments" onClick={closeBurger}>
        <Button className={`tournament ${pathname && pathname.startsWith('/tournaments') && 'current'}`}>
          Tournois
        </Button>
      </Link>
      <Link href="/help" onClick={closeBurger}>
        <Button className={`help ${pathname && pathname === '/help' && 'current'}`}>Aide</Button>
      </Link>
    </>
  );

  const rightContent = (
    <>
      <Link href="/about" onClick={closeBurger}>
        <Button className={`about ${pathname && pathname === '/about' && 'current'}`}>A propos</Button>
      </Link>

      {connected ? (
        <Link href="/dashboard" onClick={closeBurger}>
          <Button secondary className={`dashboard`}>
            Dashboard
          </Button>
        </Link>
      ) : (
        <Button
          secondary
          className="connection"
          onClick={() => {
            closeBurger();
            dispatch(setLoginModalVisible(true) as unknown as Action);
          }}>
          Connexion
        </Button>
      )}
    </>
  );

  return (
    <header id="header">
      <Link href="/dashboard">
        <img src={logo.src} alt="Logo UA23" />
      </Link>
      <nav>
        <div className="left">{leftContent}</div>
        <div className="right">
          {rightContent}

          <div className="burger-container">
            <div className={'burger ' + (isBurgerOpen ? 'open' : '')} onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className={'burger-menu-content ' + (isBurgerOpen ? 'open' : '')}>
          {leftContent}
          {rightContent}
        </div>
      </nav>

      {isLoginAllowed ? (
        <LoginModal isVisible={isVisible} />
      ) : (
        <Modal
          title="Connexion"
          onCancel={() => dispatch(setLoginModalVisible(false) as unknown as Action)}
          visible={isVisible}
          buttons={
            <Button primary onClick={() => dispatch(setLoginModalVisible(false) as unknown as Action)}>
              Fermer
            </Button>
          }>
          Les inscriptions ouvriront bientôt !
        </Modal>
      )}
    </header>
  );
}
