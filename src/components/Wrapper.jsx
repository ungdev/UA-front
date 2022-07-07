import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
import CookieConsent from './CookieConsent';
import PanelHeader from './PanelHeader';

const Wrapper = ({ Component }) => {
  const { pathname, query, replace } = useRouter();
  const isHome = pathname === '/';

  // Handle redirections
  let redirect = null;

  useEffect(() => {
    if (!isHome) {
      redirect = "/";
    }
  }, []);

  // Redirect to desired path
  useEffect(() => {
    if (redirect) {
      replace(redirect);
      return;
    }
  }, [replace, redirect]);

  // Do not display the page content if the user will be redirected
  if (redirect) {
    return (
      <>
        <CookieConsent />
      </>
    );
  }

  return (
    <>
      <CookieConsent />
      <div className="page-container">
        <main>
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
