import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { toast, Flip } from 'react-toastify';
import { Provider } from 'react-redux';

// Dependencies CSS files
import 'react-toastify/dist/ReactToastify.css';
import 'simplebar/dist/simplebar.min.css';

import withReduxStore from '../lib/withReduxStore';
import Wrapper from '../components/Wrapper';
import { googleAnalyticsId, googleVerification, nodeEnv } from '../utils/environment';
import { API } from '../utils/api';

// Import all CSS files
import '../styles.scss';

toast.configure({
  autoClose: 3000,
  pauseOnHover: true,
  transition: Flip,
  hideProgressBar: true,
});

const App = ({ Component, reduxStore }) => {
  if (process.browser) {
    if (nodeEnv() === 'production') {
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize(googleAnalyticsId());
        window.GA_INITIALIZED = true;
      }
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    }
  }

  return (
    <div>
      <Head>
        <title>UTT Arena 2020 - 27, 28 et 29 novembre 2020</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#202020" />
        <meta
          name="description"
          content={
            'Venez participer au célèbre tournoi du Grand-Est ! ' +
            "L'UTT Arena revient pour sa 18ème édition les 27, 28 et 29 novembre 2020. " +
            'Cette édition spéciale aura lieu en ligne et sera 100% gratuite ! ' +
            "Au programme, 6 tournois spotlights sur des incontournables de l'esport, du skill, des personnalités et des rencontres, " +
            'de nombreuses animations, du cashprize et des lots à gagner, qui rendront cette édition plus intense et vibrante que jamais. ' +
            "Alors prépare tout ton stuff et impose-toi dans l'arène !"
          }
        />
        <meta name="google-site-verification" content={googleVerification()} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo-notext.png" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
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
