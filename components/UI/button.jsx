import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

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
  className: PropTypes.string,

  primary: PropTypes.bool,

  onClick: PropTypes.func.isRequired,

  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

Button.defaultProps = {
  className: '',

  primary: false,
};

export default Button;