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

  useEffect(() => {
    if (isRegistered && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
      Router.replace('/dashboard/team');
    }

    if (!isRegistered && (pathname === '/dashboard' || pathname === '/dashboard/team')) {
      Router.replace('/dashboard/register');
    }
  });

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

        <main className={(!isHome && !isTournament) && 'page-padding'}><Component /></main>
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