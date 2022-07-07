import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const Wrapper = ({ Component }) => {
  const { pathname, query, replace } = useRouter();
  const isHome = pathname === '/';

  // Handle redirections
  let redirect = null;

  useEffect(() => {
    if (!isHome) {
      redirect = '/';
    }
  }, []);

  // Redirect to desired path
  useEffect(() => {
    if (redirect) {
      replace(redirect);
      return;
    }
  }, [replace, redirect]);

  return (
    <>
      <div className="page-container">
        <main>
          <Component />
        </main>
      </div>
    </>
  );
};

Wrapper.propTypes = {
  /**
   * Page component
   */
  Component: PropTypes.func.isRequired,
};

export default Wrapper;
