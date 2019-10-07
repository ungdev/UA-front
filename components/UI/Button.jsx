import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

/**
 * Displays a button that triggers an action when clicked
 */
const Button = ({ className, primary, onClick, children, type, leftIcon, rightIcon }) => (
  <button
    type={type}
    className={`button ${className} ${primary ? 'primary' : ''}`}
    onClick={onClick}
  >
    {leftIcon && <i className={`button-icon-left ${leftIcon}`} />}
    {children}
    {rightIcon && <i className={`button-icon-right ${rightIcon}`} />}
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
  /**
   * Type button
   */
  type: PropTypes.string,
  /**
   * Left icon class name
   */
  leftIcon: PropTypes.string,
  /**
   * Right icon class name
   */
  rightIcon: PropTypes.string,
};

Button.defaultProps = {
  primary: false,
  onClick: () => {},
  className: '',
  type: 'button',
  leftIcon: '',
  rightIcon: '',
};

export default Button;