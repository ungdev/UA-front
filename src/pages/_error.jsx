import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { Button } from '../components/UI';

class Error extends React.Component {
  render() {
    return (
      <>
        <h2>Une erreur est survenue...</h2>
        <p>{this.props.statusCode && `Erreur ${this.props.statusCode}`}</p>

        <Link href="/">
          <Button primary leftIcon="fas fa-chevron-left">
            Retour à l'accueil
          </Button>
        </Link>
      </>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: null,
};

export default Error;

export const getStaticProps = ({ res, err }) => {
  let statusCode = null;

  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode;
  }

  return {
    props: {
      statusCode,
    },
  };
};
