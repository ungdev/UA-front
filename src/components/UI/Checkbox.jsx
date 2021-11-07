import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a checkbox
 */
const Checkbox = ({ label, value, onChange, className, autoFocus, disabled }) => {
  return (
    <label className={`checkbox ${className}`}>
      <input
        type="checkbox"
        checked={value}
        onChange={() => {
          onChange(!value);
        }}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      <div className="ui"></div>

      <div className="checkbox-label">{label}</div>
    </label>
  );
};

Checkbox.propTypes = {
  /**
   * Label to display
   */
  label: PropTypes.node,
  /**
   * Value of the input
   */
  value: PropTypes.bool,
  /**
   * Function called when the value change,
   * the new value is passed as parameter
   */
  onChange: PropTypes.func,
  /**
   * Class of the container
   */
  className: PropTypes.string,
  /**
   * Should the input have the focus by default ?
   */
  autoFocus: PropTypes.bool,
  /**
   * Should be disabled ?
   */
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  label: '',
  value: false,
  onChange: () => {},
  className: '',
  autoFocus: false,
  disabled: false,
};

export default Checkbox;
