import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';

import Navbar from './Navbar';
import Header from './Header';
import DashboardHeader from './DashboardHeader';

const isRegistered = false;

const Wrapper = ({ Component }) => {
  const { pathname } = useRouter();
  const isHome = pathname === '/';
  const isTournament = pathname.substr(0, 13) === '/tournaments/';
  const isDashboard = pathname.substr(0, 10) === '/dashboard';

  // Handle redirections
  let redirect = null;

  if (isDashboard && process.env.DASHBOARD_AVAILABLE === 'false') {
    redirect = '/';
  }

  if (isRegistered && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
    redirect = '/dashboard/team';
  }

  if (!isRegistered && (pathname === '/dashboard' || pathname === '/dashboard/team')) {
    redirect = '/dashboard/register';
  }

  // Redirect to desired path
  useEffect(() => {
    redirect && Router.replace(redirect);
  });

  // Do not display anything if the user will be redirected
  if(redirect) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        { !isHome && !isTournament && !isDashboard && <Header /> }
        { isDashboard && (
            <DashboardHeader
              pathname={pathname}
              isRegistered={isRegistered}
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