import React, { useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import { Navbar } from '../components';

import './_app.css';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize(process.env.GA_ID);
        window.GA_INITIALIZED = true;
      }
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    }
  });
  return (
    <div>
      <Head>
        <title>UTT Arena 2019 - 6, 7 et 8 décembre 2019</title>
        <meta charSet="utf-8" />

        <link rel="icon" href="static/favicon.ico" />
        <link rel="manifest" href="static/manifest.json" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossOrigin="anonymous" />
      </Head>

      <Navbar />

      <div className="page-container">
        <Component {...pageProps} />
      </div>
    </div>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.array,
};

App.defaultProps = {
  pageProps: [],
};

export default App;