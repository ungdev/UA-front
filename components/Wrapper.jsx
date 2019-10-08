import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';
import Header from './Header';
import CookieConsent from './CookieConsent';
import DashboardHeader from './DashboardHeader';
import { autoLogin } from '../modules/login';

const Wrapper = ({ Component }) => {
  const { pathname, replace } = useRouter();
  const dispatch = useDispatch();
  const isHome = pathname === '/';
  const isTournament = pathname.substr(0, 13) === '/tournaments/';
  const isDashboard = pathname.substr(0, 10) === '/dashboard';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  useSelector((state) => {
    if(isLoggedIn !== !!state.login.user) {
      setIsLoggedIn(!!state.login.user);
      setHasTeam(!!state.login.user.team);
    }
  });

  const isLoading = useSelector((state) => state.login.loading);

  // Handle redirections
  let redirect = null;

  if (isDashboard && (!isLoggedIn || process.env.DASHBOARD_AVAILABLE !== 'true')) {
    redirect = '/';
  }
  else if (isLoggedIn && hasTeam && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
    redirect = '/dashboard/team';
  }
  else if (isLoggedIn && !hasTeam && (pathname === '/dashboard' || pathname === '/dashboard/team')) {
    redirect = '/dashboard/register';
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

  // Do not display anything if the user will be redirected
  if (isLoading || redirect || (isDashboard && !isLoggedIn)) {
    return null;
  }

  return (
    <>
      <CookieConsent />
      <Navbar isLoggedIn={isLoggedIn} />

      <div className="page-container">
        { !isHome && !isTournament && !isDashboard && <Header /> }
        { isDashboard && (
            <DashboardHeader
              pathname={pathname}
              hasTeam={hasTeam}
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