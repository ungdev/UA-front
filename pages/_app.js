import React from 'react';
import Head from 'next/head';

import Header from '../components/header';

const App = (props) => {
		const { Component, pageProps } = props;

    return (
			<div>
				<Head>
					<meta charset="utf-8" />
					<link rel="icon" href="/favicon.ico" key="icon" />
				</Head>

				<Header />
				<Component {...pageProps} />
			</div>
		);
}

export default App;