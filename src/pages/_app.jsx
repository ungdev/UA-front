import React, { useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { toast, Flip } from 'react-toastify';
import { Provider } from 'react-redux';

// Dependencies CSS files
import 'react-toastify/dist/ReactToastify.css';
import 'simplebar/dist/simplebar.min.css';

import withReduxStore from '../lib/withReduxStore';
import Wrapper from '../components/Wrapper';
import { googleAnalyticsId, googleVerification, nodeEnv, uploadsUrl } from '../utils/environment';
import Router from 'next/router';

// Import all CSS files
import '../styles.scss';

toast.configure({
  autoClose: 3000,
  pauseOnHover: true,
  transition: Flip,
  hideProgressBar: true,
});

const App = ({ Component, reduxStore }) => {
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      if (window && window._paq) {
        window._paq.push(['setCustomUrl', url]);
        window._paq.push(['setDocumentTitle', document.title]);
        window._paq.push(['trackPageView']);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <script src="/matomo.js"></script>
        <script src="/jsQR.js"></script>
        <title>UTT Arena 2021 - 26, 27 et 28 novembre 2021</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#202020" />
        <meta
          name="description"
          content={
            'Viens participer au célèbre tournoi du Grand-Est ! ' +
            "L'UTT Arena revient pour sa 18ème édition les 26, 27 et 28 novembre 2021. " +
            "Au programme, 6 tournois spotlights sur des incontournables de l'esport, du skill, des personnalités et des rencontres, " +
            'de nombreuses animations, du cashprize et des lots à gagner, qui rendront cette édition plus intense et vibrante que jamais. ' +
            "Alors prépare tout ton stuff et impose-toi dans l'arène !"
          }
        />

        <meta property="og:site_name" content="UTT Arena 2021" />
        <meta property="og:title" content="UTT Arena 2021 - 26, 27 et 28 novembre 2021" />
        <meta property="og:url" content="https://arena.utt.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={uploadsUrl() + '/images/banniere_SEO.png'} />
        <meta property="og:image:alt" content="Logo de l'UTT Arena" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="1500" />
        <meta
          property="og:description"
          content="Entrez dans l’arène les 26, 27 et 28 novembre pour le retour de la compétition e-sport Troyenne !"
        />

        <meta name="twitter:title" content="UTT Arena 2021 - 26, 27 et 28 novembre 2021" />
        <meta name="twitter:site" content="@UTTArena" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={uploadsUrl() + '/images/banniere_SEO.png'} />
        <meta name="twitter:image:alt" content="Bannière de l'UTT Arena 2021, le 26, 27 et 28 Novembre" />
        <meta
          property="twitter:description"
          content="Entrez dans l’arène les 26, 27 et 28 novembre pour le retour de la compétition e-sport Troyenne !"
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
