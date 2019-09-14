import React, { useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

import withReduxStore from '../lib/withReduxStore';
import { Navbar } from '../components';

import './_app.css';
import headText from '../assets/head';

toast.configure({
  autoClose: 2000,
  pauseOnHover: false,
  transition: Flip,
  hideProgressBar: true,
});

const App = ({ Component, pageProps, reduxStore }) => {
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
        <title>{headText.title}</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#202020" />
        <meta name="description" content={headText.description} />

        <link rel="icon" href="/static/favicon.ico" />
        <link rel="manifest" href="/static/manifest.json" />
        <link rel="apple-touch-icon" href="/static/logo-notext.png" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossOrigin="anonymous" />
      </Head>
      <Provider store={reduxStore}>
        <Navbar />

        <div className="page-container">
          <Component {...pageProps} />
        </div>
      </Provider>
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

export default withReduxStore(App);