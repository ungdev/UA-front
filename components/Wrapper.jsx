import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';
import Header from './Header';
import CookieConsent from './CookieConsent';
import PanelHeader from './PanelHeader';
import { autoLogin } from '../modules/login';

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
  const [isVisitor, setIsVisitor] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useSelector((state) => {
    const { user } = state.login;
    if (isLoggedIn !== !!user) {
      setIsLoggedIn(!!user);
      setHasTeam(!!user.team);
      setIsVisitor(user.type === 'visitor');
    }
    else if (user && hasTeam !== !!user.team) {
      setHasTeam(!!user.team);
    }
    else if (user && !isVisitor && user.type === 'visitor') {
      setIsVisitor(true);
    }
    else if (user && isVisitor && user.type === 'none') {
      setIsVisitor(false);
    }
    if (user && isPaid !== user.isPaid) {
      setIsPaid(user.isPaid);
    }
    if (user && !!user.permissions !== isAdmin) {
      setIsAdmin(true);
    }
  });

  const isLoading = useSelector((state) => state.login.loading);

  // Handle redirections
  let redirect = null;

  if (isDashboard && (!isLoggedIn || process.env.DASHBOARD_AVAILABLE !== 'true')) {
    redirect = '/';
  }
  else if (isLoggedIn) {
    if (hasTeam && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
      redirect = '/dashboard/team';
    }
    else if (isVisitor && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
      redirect = '/dashboard/coach';
    }
    else if (!isVisitor && !hasTeam && isPaid) {
      if(pathname === '/dashboard') {
        redirect = '/dashboard/register';
      }
    }
    else if (!isVisitor && !hasTeam && (isDashboard && pathname !== '/dashboard/register' && pathname !== '/dashboard/account')) {
      redirect = '/dashboard/register';
    }
    if (!isAdmin && isAdminPanel) {
      redirect = '/dashboard';
    }
  }

  // Redirect to desired path
  useEffect(() => {
    if (redirect && !isLoading) {
      replace(redirect);
      return;
    }
  }, [redirect, isLoading]);

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
    if (hasTeam) {
      return [
        { title: 'Équipe', href: '/dashboard/team' },
        { title: 'Boutique', href: '/dashboard/shop' },
        { title: 'Mes achats', href: '/dashboard/purchases' },
        { title: 'Mon compte', href: '/dashboard/account' },
      ];
    }
    if (isVisitor) {
      return [
        { title: 'Coach', href: '/dashboard/coach' },
        { title: 'Boutique', href: '/dashboard/shop' },
        { title: 'Mes achats', href: '/dashboard/purchases' },
        { title: 'Mon compte', href: '/dashboard/account' },
      ];
    }
    if (isPaid) {
      return [
        { title: 'Inscription', href: '/dashboard/register' },
        { title: 'Boutique', href: '/dashboard/shop' },
        { title: 'Mes achats', href: '/dashboard/purchases' },
        { title: 'Mon compte', href: '/dashboard/account' },
      ];
    }
    return [
      { title: 'Inscription', href: '/dashboard/register' },
      { title: 'Mon compte', href: '/dashboard/account' },
    ];
  };

  const linksAdmin = () => {
    if (permissions === 'entry') {
      return [
        { title: 'Entrée', href: '/admin/entry' },
      ];
    }
    return [
      { title: 'Entrée', href: '/admin/entry' },
      { title: 'Notifications', href: '/admin/notification' },
      { title: 'Utilisateurs', href: '/admin/users' },
    ];
  };

  return (
    <>
      <CookieConsent />
      <Navbar isLoggedIn={isLoggedIn} />

      <div className="page-container">
        { !isHome && !isTournament && !isDashboard && !isAdminPanel && <Header /> }
        { isDashboard && (
            <PanelHeader
              pathname={pathname}
              links={linksDashboard}
              title="Dashboard"
            />
          )
        }
        { isAdminPanel && (
            <PanelHeader
              pathname={pathname}
              links={linksAdmin}
              title="Administration"
            />
          )
        }
        <main className={(!isHome && !isTournament) ? 'page-padding' : ''}><Component /></main>
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