import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a textarea
 */
const Textarea = ({ label, placeholder, value, onChange, className }) => {
  Textarea.textarea = <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
  return (
    <div className={`textarea ${className}`}>
      <label>
        <div className="textarea-label">{label}</div>

        {Textarea.textarea}

        <div className="line" />
      </label>
    </div>
  );
};

Textarea.propTypes = {
  /**
   * Label to display
   */
  label: PropTypes.string.isRequired,
  /**
   * Text to show when field is blank
   */
  placeholder: PropTypes.string,
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

Textarea.defaultProps = {
  placeholder: '',
  value: '',
  className: '',
};

export default Textarea;
