import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Navbar from './Navbar';
import Header from './Header';
import CookieConsent from './CookieConsent';
import { fetchSettings } from '../modules/settings';
import { autoLogin, validate } from '../modules/login';
import { hasOrgaPermission } from '../utils/permission';

const Wrapper = ({ Component }) => {
  const { pathname, query, replace } = useRouter();
  const dispatch = useDispatch();
  const isDashboard = pathname.substr(0, 10) === '/dashboard';
  const permissions = useSelector((state) => state.login.user && state.login.user.permissions);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
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
    if (user && hasPaid !== user.hasPaid) {
      setHasPaid(user.hasPaid);
    }
    if (user && hasOrgaPermission(user.permissions) !== isAdmin) {
      setIsAdmin(!isAdmin);
    }
  });

  const isLoginAllowed = useSelector((state) => state.settings.login);
  const isShopAllowed = useSelector((state) => state.settings.shop);

  const isLoading = useSelector((state) => state.login.loading);

  // Handle redirections
  let redirect = null;

  useEffect(() => {
    if (isLoading) {
      return;
    }
    // 3 actions possible :
    //  - oauth
    //  - validate
    //  - pwd-reset
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
          toast.error("Tu as refusé à nos services l'accès à ton compte Discord");
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
      dispatch(validate(query.state));
      replace(pathname);
    }
  }, [isLoading]);

  // Fetch Settings
  useEffect(() => {
    isLoginAllowed || dispatch(fetchSettings());
  }, []);

  // Redirect to desired path
  useEffect(() => {
    if (redirect && !isLoading) {
      replace(redirect);
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
        <Navbar isLoggedIn={isLoggedIn} action={{ action: query.action, state: query.state }} />
      </>
    );
  }

  return (
    <>
      <CookieConsent />
      <Navbar isLoggedIn={isLoggedIn} action={{ action: query.action, state: query.state }} />
      <div className="page-container">
        <Header />
        <main>
          {/*<main className='page-padding' />*/}
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
