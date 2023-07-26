'use client';
import React from 'react';

const Radio = ({
  label,
  options,
  name,
  value,
  onChange,
  row,
  className,
  disabled,
}: {
  /**
   * Label of the field
   */
  label?: Node;
  /**
   * Available values
   */
  options: {
    name: Node;
    value: string;
  }[];
  /**
   * Value of the field
   */
  value?: string;
  /**
   * Function triggered when the value change
   */
  onChange?: (string) => void;
  /**
   * Used to identify a group of radio inputs
   */
  name: string;
  /**
   * Should the inputs be in a row ?
   */
  row?: boolean;
  /**
   * Class to apply to the container
   */
  className?: string;
  /**
   * Whether the input should be disabled
   */
  disabled?: boolean;
}) => (
  <div className={`radio ${row ? 'row' : ''} ${className}`}>
    <div className="radio-label">{label}</div>

    <div className="radio-container">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />

          <div className="radio-value">
            <i className="far fa-circle" />
          </div>

          {option.name}
        </label>
      ))}
    </div>
  </div>
);

Radio.defaultProps = {
  label: '',
  value: '',
  onChange: () => {},
  row: false,
  className: '',
  disabled: false,
};

export default Radio;
