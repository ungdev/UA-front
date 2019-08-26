import React from 'react';
import PropTypes from 'prop-types';

import InputBase from './InputBase';

/**
 * Displays a controlled textarea
 */
const Textarea = ({ key, label, placeholder, value, onChange }) => (
  <InputBase
    Component="textarea"
    key={key}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    label={label}
  />
);

Textarea.propTypes = {
  /**
   * Key for the input
   */
  key: PropTypes.string.isRequired,
  /**
   * Label to display for the input
   */
  label: PropTypes.string.isRequired,
  /**
   * Text to show before user input
   */
  placeholder: PropTypes.string,
  /**
   * Controlled value of the input
   */
  value: PropTypes.string,
  /**
   * onChange function, receive `event`
   */
  onChange: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  placeholder: '',
  value: '',
};

export default Textarea;