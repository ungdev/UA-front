'use client';
import React from 'react';

/**
 * Displays a select
 */
const Select = ({
  label,
  options,
  value,
  onChange,
  disabled,
  className,
}: {
  /**
   * Label to display
   */
  label?: string;
  /**
   * List of options
   */
  options: {
    label: string;
    value: string;
  }[];
  /**
   * Value of the select
   */
  value: string;
  /**
   * Function called when the value change,
   * the new value is passed as parameter
   */
  onChange: (string) => void;
  /**
   * Is the field disabled ?
   */
  disabled: boolean;
  /**
   * Class of the container
   */
  className: string;
}) => (
  <div className={`select ${className}`}>
    <label>
      <div className="select-label">{label}</div>

      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="line" />
    </label>
  </div>
);

Select.defaultProps = {
  label: '',
  disabled: false,
  className: '',
};

export default Select;
