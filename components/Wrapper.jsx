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
  const [isVisitor, setIsVisitor] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

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
              isVisitor={isVisitor}
              isPaid={isPaid}
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