import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Collapse.css';

/**
 * Display an extension panel
 */
const Collapse = ({ title, children }) => {
  const [contentVisible, setContentVisible] = useState(false);
  return (
    <div className="card">
      <div className="title" onClick={() => setContentVisible(!contentVisible)}>
        <p>{title}</p>
        <div className={`arrow ${contentVisible ? 'open' : ''}`}>
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
        </div>
      </div>
      <div className={`content ${contentVisible ? 'open' : ''}`}>
        <div className="text">
          {children}
        </div>
      </div>
    </div>
  );
};

Collapse.propTypes = {
  /**
   * Title of the panel
   */
  title: PropTypes.string.isRequired,
  /**
   * Content to hide
   */
  children: PropTypes.node.isRequired,
};

export default Collapse;