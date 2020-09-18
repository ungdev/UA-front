import React from 'react';
import PropTypes from 'prop-types';

import './Inputs.css';

/**
 * Displays an input
 */
const Input = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  min,
  max,
  className,
  autocomplete,
  disabled,
  autoFocus,
}) => {
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
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete={autocomplete}
          disabled={disabled}
          title={disabled ? 'Vous ne pouvez pas modifier ce champ' : undefined}
          autoFocus={autoFocus}
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
  label: PropTypes.node,
  /**
   * Text to display if field is blank
   */
  placeholder: PropTypes.string,
  /**
   * Value of the input
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  /**
   * Should the input have the focus by default ?
   */
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  value: '',
  onChange: () => {},
  min: undefined,
  max: undefined,
  className: '',
  autocomplete: '',
  disabled: false,
  autoFocus: false,
};

export default Input;
