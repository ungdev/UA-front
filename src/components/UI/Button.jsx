import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

/**
 * Displays a button that triggers an action when clicked
 */
const Button = ({ primary, onClick, children, type, leftIcon, rightIcon, disabled, noStyle, className }) => (
  <button
    type={type}
    className={`button ${className} ${primary ? 'primary' : ''} ${noStyle ? 'no-style' : ''} ${
      !children ? 'empty' : ''
    }`}
    onClick={onClick}
    disabled={disabled}>
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
  children: PropTypes.node,
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
  /**
   * Is the button disabled ?
   */
  disabled: PropTypes.bool,
  /**
   * Should the button have no style ?
   */
  noStyle: PropTypes.bool,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Button.defaultProps = {
  primary: false,
  onClick: () => {},
  children: '',
  type: 'button',
  leftIcon: '',
  rightIcon: '',
  disabled: false,
  noStyle: false,
  className: '',
};

export default Button;
