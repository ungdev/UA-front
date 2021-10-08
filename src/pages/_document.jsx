import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head />
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
