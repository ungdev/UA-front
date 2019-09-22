import React, { useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

import withReduxStore from '../lib/withReduxStore';
import { Navbar, HeaderDashboard } from '../components';
import headText from '../assets/head';

import './_app.css';

toast.configure({
  autoClose: 2000,
  pauseOnHover: false,
  transition: Flip,
  hideProgressBar: true,
});

const App = ({ Component, pageProps, reduxStore, router }) => {
  useEffect(() => {
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
  });

  return (
    <div>
      <Head>
        <title>{headText.title}</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#202020" />
        <meta name="description" content={headText.description} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/static/logo-notext.png" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossOrigin="anonymous" />
      </Head>
      <Provider store={reduxStore}>
        <Navbar />

        <div className="page-container">
          { router.route.includes("/dashboard") && <HeaderDashboard />}
          <Component {...pageProps} />
        </div>
      </Provider>
    </div>
  );
};

App.propTypes = {
  /**
   * The page component
   */
  Component: PropTypes.func.isRequired,
  /**
   * The page component props
   */
  pageProps: PropTypes.array,
  /**
   * The redux store
   */
  reduxStore: PropTypes.object.isRequired,
  /**
   * Route Next
   */
  router: PropTypes.object.isRequired,
};

App.defaultProps = {
  pageProps: [],
};

export default withReduxStore(App);