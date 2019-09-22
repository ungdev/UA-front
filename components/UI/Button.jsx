import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

/**
 * Displays a button that triggers an action when clicked
 */
const Button = ({ className, primary, onClick, children }) => (
  <button
    type="button"
    className={`button ${className} ${primary ? 'primary' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  /**
   * Whether the button is a primary button or not
   */
  primary: PropTypes.bool,
  /**
   * Function called when the user clicks on the button
   */
  onClick: PropTypes.func,
  /**
   * Button content
   */
  children: PropTypes.node.isRequired,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Button.defaultProps = {
  primary: false,
  onClick: () => {},
  className: '',
};

export default Button;