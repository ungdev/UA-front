import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

import withReduxStore from '../lib/withReduxStore';
import { Wrapper } from '../components';
import headText from '../assets/head';

import './_app.css';

toast.configure({
  autoClose: 3000,
  pauseOnHover: true,
  transition: Flip,
  hideProgressBar: true,
});

const App = ({ Component, reduxStore }) => {
  if(process.browser) {
    if (process.env.NODE_ENV === 'production') {
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize(process.env.GA_ID);
        window.GA_INITIALIZED = true;
      }
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    }

    if(navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
    }
  }

  return (
    <div>
      <Head>
        <title>{headText.title}</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#202020" />
        <meta name="description" content={headText.description} />
        <meta name="google-site-verification" content={process.env.GOOGLE_VERIFICATION} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/static/logo-notext.png" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossOrigin="anonymous" />
      </Head>

      <Provider store={reduxStore}>
        <Wrapper Component={Component} />
      </Provider>
    </div>
  );
};

App.propTypes = {
  /**
   * Page component
   */
  Component: PropTypes.func.isRequired,
  /**
   * The redux store
   */
  reduxStore: PropTypes.object.isRequired,
};

export default withReduxStore(App);