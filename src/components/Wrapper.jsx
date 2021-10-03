import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';
import Header from './Header';
import CookieConsent from './CookieConsent';
import PanelHeader from './PanelHeader';
import { autoLogin } from '../modules/login';
import { hasOrgaPermission } from '../utils/permission';
import { isLoginAllowed, isShopAllowed } from '../utils/settings';

const Wrapper = ({ Component }) => {
  const { pathname, replace } = useRouter();
  const dispatch = useDispatch();
  const isHome = pathname === '/';
  const isTournament = pathname.substr(0, 13) === '/tournaments/';
  const isDashboard = pathname.substr(0, 10) === '/dashboard';
  const isAdminPanel = pathname.substr(0, 6) === '/admin';
  const permissions = useSelector((state) => state.login.user && state.login.user.permissions);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSpectator, setIsSpectator] = useState(false);

  useSelector((state) => {
    const { user } = state.login;
    if (isLoggedIn !== !!user) {
      setIsLoggedIn(!!user);
      setHasTeam(!!user.teamId);
      setIsSpectator(user.type === 'spectator');
    } else if (user && hasTeam !== !!user.teamId) {
      setHasTeam(!!user.teamId);
    } else if (user && !isSpectator && user.type === 'spectator') {
      setIsSpectator(true);
    } else if (user && isSpectator && user.type !== 'spectator') {
      setIsSpectator(false);
    }
    if (user && isPaid !== user.isPaid) {
      setIsPaid(user.isPaid);
    }
    if (user && hasOrgaPermission(user.permissions) !== isAdmin) {
      setIsAdmin(true);
    }
  });

  const isLoading = useSelector((state) => state.login.loading);

  // Handle redirections
  let redirect = null;

  if (isAdminPanel && !isLoggedIn) {
    redirect = '/';
  } else if (isDashboard && (!isLoggedIn || !isLoginAllowed())) {
    redirect = '/';
  } else if (isLoggedIn) {
    if (hasTeam && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
      redirect = '/dashboard/team';
    } else if (pathname === '/dashboard/shop' && !isShopAllowed()) {
      redirect = '/dashboard';
    } else if (isSpectator && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
      redirect = '/dashboard/spectator';
    } else if (!isSpectator && !hasTeam) {
      if (pathname === '/dashboard/spectator') {
        redirect = '/dashboard/register';
      }
    } else if (
      !isSpectator &&
      !hasTeam &&
      isDashboard &&
      pathname !== '/dashboard/register' &&
      pathname !== '/dashboard/account'
    ) {
      redirect = '/dashboard/register';
    }
    if (!isAdmin && isAdminPanel) {
      redirect = '/dashboard';
    } else if (pathname === '/admin' && permissions === 'entry') {
      redirect = '/admin/entry';
    } else if (pathname === '/admin' && permissions === 'admin') {
      redirect = '/admin/users';
    }
  }

  // Redirect to desired path
  useEffect(() => {
    if (redirect && !isLoading) {
      replace(redirect);
      return;
    }
  }, [replace, redirect, isLoading]);

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  // Do not display the page content if the user will be redirected
  if (isLoading || redirect || (isDashboard && !isLoggedIn)) {
    return (
      <>
        <CookieConsent />
        <Navbar isLoggedIn={isLoggedIn} />
      </>
    );
  }

  const linksDashboard = () => {
    const menu = [];

    if (hasTeam) {
      menu.push({ title: 'Équipe', href: '/dashboard/team' });
    } else if (isSpectator) {
      menu.push({ title: 'Spectateur', href: '/dashboard/spectator' });
    } else if (isPaid) {
      menu.push({ title: 'Inscription', href: '/dashboard/register' });
    }

    if (hasTeam || isSpectator || isPaid) {
      if (isShopAllowed()) {
        menu.push({ title: 'Boutique', href: '/dashboard/shop' });
      }
      menu.push({ title: 'Mes achats', href: '/dashboard/purchases' });
    } else {
      menu.push({ title: 'Inscription', href: '/dashboard/register' });
    }

    menu.push({ title: 'Mon compte', href: '/dashboard/account' });
    return menu;
  };

  const linksAdmin = () => {
    const menu = [];

    if (permissions === 'anim' || permissions === 'admin') {
      menu.push({ title: 'Utilisateurs', href: '/admin/users' });
    }

    if (permissions === 'entry' || permissions === 'admin') {
      menu.push({ title: 'Entrée', href: '/admin/entry' });
    }

    menu.push({ title: 'Mon compte', href: '/admin/account' });

    return menu;
  };

  return (
    <>
      <CookieConsent />
      <Navbar isLoggedIn={isLoggedIn} />

      <div className="page-container">
        {!isHome && !isTournament && !isDashboard && !isAdminPanel && <Header />}
        {isDashboard && <PanelHeader pathname={pathname} links={linksDashboard} title="Dashboard" />}
        {isAdminPanel && <PanelHeader pathname={pathname} links={linksAdmin} title="Administration" />}
        <main className={!isHome && !isTournament ? 'page-padding' : ''}>
          <Component />
        </main>
      </div>
    </>
  );
};

Wrapper.propTypes = {
  /**
   * Page component
   */
  Component: PropTypes.func.isRequired,
};

export default Wrapper;
