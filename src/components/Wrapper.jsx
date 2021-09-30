import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Navbar from './Navbar';
import Header from './Header';
import CookieConsent from './CookieConsent';
import PanelHeader from './PanelHeader';
import { autoLogin, saveToken, SET_USER } from '../modules/login';
import { hasOrgaPermission } from '../utils/permission';
import { isLoginAllowed, isShopAllowed } from '../utils/settings';
import { API } from '../utils/api';

const Wrapper = ({ Component }) => {
  const { pathname, query, replace } = useRouter();
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

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (query.action === 'oauth') {
      switch (query.state) {
        case '0':
          toast.success('Le lien avec le compte Discord a bien été créé !');
          redirect = pathname;
          break;
        case '1':
          toast.success('Le lien avec le compte Discord a bien été mis à jour !');
          redirect = pathname;
          break;
        case '2':
          toast.success("Le lien avec le compte Discord n'a pas été modifié");
          redirect = pathname;
          break;
        case '3':
          toast.error("Ce compte Discord est déjà lié au compte d'un autre utilisateur");
          redirect = pathname;
          break;
        case '4':
          toast.error("Vous avez refusé à nos services l'accès à votre compte Discord");
          redirect = pathname;
          break;
        case '5':
          toast.error('Une erreur de requête est survenue');
          redirect = pathname;
          break;
        case '6':
          toast.error('Une erreur inconnue est survenue');
          redirect = pathname;
          break;
      }
    } else if (query.action === 'validate') {
      API.post(`auth/validate/${query.state}`).then((res) => {
        dispatch(saveToken(res.data.token));
        dispatch({
          type: SET_USER,
          user: res.data.user,
        });
        toast.success('Le compte a été confirmé !');
        replace(pathname);
      });
    }
  }, [isLoading]);

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
        <Navbar isLoggedIn={isLoggedIn} action={query.action} state={query.state} />
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
      <Navbar isLoggedIn={isLoggedIn} action={{ action: query.action, state: query.state }} />
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
