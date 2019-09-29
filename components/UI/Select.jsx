import React from 'react';
import PropTypes from 'prop-types';

import './Inputs.css';

/**
 * Displays a select
 */
const Select = ({ options, label, value, onChange, className }) => (
  <div className={`select ${className}`}>
    <label>
      <div className="select-label">{label}</div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  label: PropTypes.string.isRequired,
  /**
   * Value of the select
   */
  value: PropTypes.string.isRequired,
  /**
   * Function called when the value change,
   * the new value is passed as parameter
   */
  onChange: PropTypes.func.isRequired,
  /**
   * List of options
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Select.defaultProps = {
  className: '',
};

export default Select;
