import React from 'react';
import PropTypes from 'prop-types';

import './Helper.css';

const Helper = ({ children, className }) => (
  <div className={`helper ${className}`}>
    <i className="fas fa-question-circle helper-icon" tabIndex="0" />

    <div className="helper-content">{children}</div>
  </div>
);

Helper.propTypes = {
  /**
   * To display when the cursor is hover the helper
   */
  children: PropTypes.node.isRequired,
  /**
   * Class to apply to the container
   */
  className: PropTypes.string,
};

Helper.defaultProps = {
  className: '',
};

export default Helper;