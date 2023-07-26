'use client';
import React from 'react';

/**
 * Displays a textarea
 */
const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  className,
}: {
  /**
   * Label to display
   */
  label: string;
  /**
   * Text to show when field is blank
   */
  placeholder?: string;
  /**
   * Value of the input
   */
  value?: string;
  /**
   * Function called when the value change,
   * the new value is passed as parameter
   */
  onChange: (string) => void;
  /**
   * Class of the container
   */
  className?: string;
}) => (
  <div className={`textarea ${className}`}>
    <label>
      <div className="textarea-label">{label}</div>

      <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />

      <div className="line" />
    </label>
  </div>
);

Textarea.defaultProps = {
  placeholder: '',
  value: '',
  className: '',
};

export default Textarea;
