import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

/**
 * Displays a button that triggers an action when clicked
 */
const Button = (props) => (
  <span className={props.className}>
    <button
      type="button"
      className={`button ${props.primary ? 'primary' : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  </span>
);

Button.propTypes = {
  /**
   * Whether the button is a primary button or not
   */
  primary: PropTypes.bool,

  /**
   * Function called when the user clicks on the button
   */
  onClick: PropTypes.func.isRequired,

  /**
   * The button content
   */
  children: PropTypes.node.isRequired,

  /**
   * The class of the button container
   */
  className: PropTypes.string,
};

Button.defaultProps = {
  primary: false,
  className: '',
};

export default Button;