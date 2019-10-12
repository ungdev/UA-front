import React from 'react';
import PropTypes from 'prop-types';

import './Inputs.css';

/**
 * Displays a select
 */
const Select = ({ label, options, value, onChange, disabled, className }) => (
  <div className={`select ${className}`}>
    <label>
      <div className="select-label">{label}</div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map((option) => (
          <option
            value={option.value}
            key={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="line" />
    </label>
  </div>
);

Select.propTypes = {
  /**
   * Label to display
   */
  label: PropTypes.string,
  /**
   * List of options
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  })).isRequired,
  /**
   * Value of the select
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  /**
   * Function called when the value change,
   * the new value is passed as parameter
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Is the field disabled ?
   */
  disabled: PropTypes.bool,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Select.defaultProps = {
  label: '',
  disabled: false,
  className: '',
};

export default Select;
