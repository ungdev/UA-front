import React from 'react';
import PropTypes from 'prop-types';

import './Inputs.css';

let id = 0;

/**
 * Displays an input
 */
const Input = ({ type, label, value, onChange, min, max, className, autocomplete }) => {
  const handleChange = (newValue) => {
    if (type === 'number' && newValue !== '' && (newValue < min || newValue > max)) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className={`input ${className}`}>
      <label htmlFor={`input-${id}`}>{label}</label>

      <input
        type={type}
        id={`input-${id++}`}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        autoComplete={autocomplete}
      />

      <div className="line" />
    </div>
  );
};

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
   * Minimum value (only for type="number")
   */
  min: PropTypes.number,
  /**
   * Maximum value (only for type="number")
   */
  max: PropTypes.number,
  /**
   * Class of the container
   */
  className: PropTypes.string,
  /**
   * Autocomplete type
   */
  autocomplete: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  min: undefined,
  max: undefined,
  className: '',
  autocomplete: '',
};

export default Input;