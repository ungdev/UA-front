import React from 'react';
import PropTypes from 'prop-types';

import './Inputs.css';

/**
 * Displays an input
 */
const Input = ({ type, label, value, onChange, min, max, className, autocomplete, disabled }) => {
  const handleChange = (newValue) => {
    if (type === 'number' && newValue !== '' && (newValue < min || newValue > max)) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className={`input ${className}`}>
      <label>
        <div className="input-label">{label}</div>

        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete={autocomplete}
          disabled={disabled}
          title={disabled ? 'Vous ne pouvez pas modifier ce champ': undefined}
        />

        <div className="line" />
      </label>
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
  label: PropTypes.string,
  /**
   * Value of the input
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * Function called when the value change,
   * the new value is passed as parameter
   */
  onChange: PropTypes.func,
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
  /**
   * Is the input disabled ?
   */
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  label: '',
  value: '',
  onChange: () => {},
  min: undefined,
  max: undefined,
  className: '',
  autocomplete: '',
  disabled: false,
};

export default Input;