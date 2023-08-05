import { setLoginModalVisible } from '@/modules/loginModal';
import Button from './UI/Button';
import Link from 'next/link';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { type Action } from '@reduxjs/toolkit';
import { Modal } from './UI';
import LoginModal from './landing/LoginModal';
import { usePathname } from 'next/navigation';

/**
 * Navbar component that displays a navigation bar with links to different pages.
 * @returns JSX.Element
 */
export default function Navbar() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  console.log("pathname " + pathname);

  const isLoginAllowed = useAppSelector((state) => state.settings.login);
  const isVisible = useAppSelector((state) => state.loginModal.visible);

  const closeBurger = () => {
    if (!isBurgerOpen) return;
    setIsBurgerOpen(false);
  };

  const leftContent = (
    <>
      <Link href="/" onClick={closeBurger}>
        <Button className={`home ${pathname === '/' && 'current'}`}>Accueil</Button>
      </Link>
      <Link href="/event" onClick={closeBurger}>
        <Button className={`event ${pathname === '/event' && 'current'}`}>Événement</Button>
      </Link>
      <Link href="/tournaments" onClick={closeBurger}>
        <Button className={`tournament ${pathname.startsWith('/tournaments') && 'current'}`}>Tournois</Button>
      </Link>
      <Link href="/help" onClick={closeBurger}>
        <Button className={`help ${pathname === '/help' && 'current'}`}>Aide</Button>
      </Link>
    </>
  );

  const rightContent = (
    <>
      <Link href="/about" onClick={closeBurger}>
        <Button className={`about ${pathname === '/about' && 'current'}`}>A propos</Button>
      </Link>

      <Button
        secondary
        className="connection"
        onClick={() => {
          closeBurger();
          dispatch(setLoginModalVisible(true) as unknown as Action);
        }}>
        Connexion
      </Button>
    </>
  );

  return (
    <>
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
    </>
  );
}
