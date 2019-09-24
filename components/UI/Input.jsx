import React from 'react';
import PropTypes from 'prop-types';

import './Inputs.css';

let id = 0;

/**
 * Displays an input
 */
const Input = ({ type, label, value, onChange, className }) => (
  <div className={`input ${className}`}>
    <label htmlFor={`input-${id}`}>{label}</label>

    <input
      type={type}
      id={`input-${id++}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />

    <div className="line" />
  </div>
);

Input.propTypes = {
  /**
   * Input type
   */
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  /**
   * Label to display
   */
  label: PropTypes.string.isRequired,
  /**
   * Value of the input
   */
  value: PropTypes.string,
  /**
   * Function called when the value change,
   * the new value is passed as parameter
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  className: '',
};

export default Input;