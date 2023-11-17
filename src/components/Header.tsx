'use client';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import logo from '@/../public/images/logo.png';
import LoginModal from './landing/LoginModal';
import { Button, Modal, Title } from './UI';
import { setLoginModalVisible } from '@/modules/loginModal';
import type { Action } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon, { IconName } from '@/components/UI/Icon';
import { deleteCart } from '@/modules/cart';
import { isFakeConnection, logBackToAdmin, logout } from '@/modules/login';

/**
 * Header component that displays the logo, navigation bar, and buttons for about and login.
 */
export default function Header({
  connected = false,
  admin = false,
}: {
  /** Determines whether the user is connected or not. */
  connected?: boolean;
  /** Determines whether the user is an admin or not. */
  admin?: boolean;
}) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isLoginAllowed = useAppSelector((state) => state.settings.login);
  const isVisible = useAppSelector((state) => state.loginModal.visible);
  const trigger = useRef<HTMLDivElement>();
  const header = useRef<HTMLDivElement>();

  useEffect(() => {
    new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0%',
        threshold: 0,
      } as IntersectionObserverInit,
    ).observe(trigger.current!);
  }, []);

  const closeBurger = () => {
    if (!isBurgerOpen) return;
    setIsBurgerOpen(false);
    return;
  };

  const leftContent = (
    <>
      <Link href="/" onClick={closeBurger}>
        <Button className={`${styles.underlineButton} ${pathname && pathname === '/' && styles.current}`}>
          Accueil
        </Button>
      </Link>
      <Link href="/event" onClick={closeBurger}>
        <Button className={`${styles.underlineButton} ${pathname && pathname === '/event' && styles.current}`}>
          Évènement
        </Button>
      </Link>
      <Link href="/tournaments" onClick={closeBurger}>
        <Button
          className={`${styles.underlineButton} ${pathname && pathname.startsWith('/tournaments') && styles.current}`}>
          Tournois
        </Button>
      </Link>
      <Link href="/help" onClick={closeBurger}>
        <Button className={`${styles.underlineButton} ${pathname && pathname === '/help' && styles.current}`}>
          Aide
        </Button>
      </Link>
    </>
  );

  const rightContent = (
    <>
      <Link href="/about" onClick={closeBurger}>
        <Button className={`${styles.underlineButton} ${pathname && pathname === '/about' && styles.current}`}>
          À propos
        </Button>
      </Link>

      {connected && (
        <Button
          onClick={() => {
            // Remove the cart from the local storage, to avoid moving carts from one account to another
            deleteCart();
            if (isFakeConnection()) {
              dispatch(logBackToAdmin() as unknown as Action);
            } else {
              dispatch(logout() as unknown as Action);
            }
          }}>
          <Icon name={IconName.SignOut} className={styles.disconnectIcon} />
        </Button>
      )}

      {connected ? (
        <Link href={admin ? '/admin' : '/dashboard'} onClick={closeBurger}>
          <Button secondary>{admin ? 'Admin' : 'Dashboard'}</Button>
        </Link>
      ) : (
        <Button
          secondary
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
    <div className={`${styles.headerWrapper} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.scrollTrigger} ref={trigger as MutableRefObject<HTMLDivElement>} />
      <header ref={header as MutableRefObject<HTMLDivElement>} id="header" className={styles.header}>
        <div className={styles.content}>
          <Link href="/">
            <Image src={logo.src} width={72} height={61.5} alt="Logo UA23" />
            {/* For SEO */}
            <Title level={1} className={styles.hidden}>
              UTT Arena 2023
            </Title>
          </Link>
          <nav>
            <div className={styles.left}>{leftContent}</div>
            <div className={`${styles.right} ${!connected ? styles.notConnected : ''}`}>
              {rightContent}

              <div className={styles.burgerContainer}>
                <div
                  className={`${styles.burger} ${isBurgerOpen ? styles.open : ''}`}
                  onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className={`${styles.burgerMenuContent} ${isBurgerOpen ? styles.open : ''}`}>
              {leftContent}
              {rightContent}
            </div>
          </nav>
        </div>

        {isLoginAllowed ? (
          <LoginModal visible={isVisible} />
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
    </div>
  );
}
