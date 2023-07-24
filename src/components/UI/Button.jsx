import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a button that triggers an action when clicked
 */
const Button = ({ primary, onClick, children, type, leftIcon, rightIcon, disabled, noStyle, isPink, className }) => {
  return (
    <button
      type={type}
      className={`button ${primary ? 'primary' : ''} ${isPink ? 'pink' : ''} ${className ? className : ''}
       ${noStyle ? 'no-style' : ''} ${!children ? 'empty' : ''}`}
      onClick={onClick}
      disabled={disabled}>
      {leftIcon && <i className={`button-icon-left ${leftIcon}`} />}
      {children}
      {rightIcon && <i className={`button-icon-right ${rightIcon}`} />}
    </button>
  );
};

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
   * Is the button pink or blue/without color (depending on whether the button is primary)
   */
  isPink: PropTypes.bool,
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
  isPink: false,
  className: '',
};

export default Button;
