import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend&family=Montserrat:wght@400;600;700&display=swap" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

export const getStaticProps = async (ctx) => {
  const initialProps = await Document.getStaticProps(ctx);
  return {
    props: {
      ...initialProps.props,
    },
  };
};
