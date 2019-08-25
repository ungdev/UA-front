import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { Navbar } from '../components';

import './_app.css';

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <div>
      <Head>
        <title>UTT Arena 2019 - 6, 7 et 8 décembre 2019</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="static/favicon.ico" key="icon" />
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
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