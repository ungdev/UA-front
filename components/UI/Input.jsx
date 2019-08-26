import React from 'react';
import PropTypes from 'prop-types';

import InputBase from './InputBase';

/**
 * Displays a controlled input
 */
const Input = ({ id, label, placeholder, value, onChange, type }) => (
  <InputBase
    Component="input"
    key={id}
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    label={label}
    type={type}
  />
);

Input.propTypes = {
  /**
   * id for the input
   */
  id: PropTypes.string.isRequired,
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
  /**
   * HTML native input type
   */
  type: PropTypes.oneOf(['text', 'password', 'number']),
};

Input.defaultProps = {
  placeholder: '',
  value: '',
  type: 'text',
};

export default Input;