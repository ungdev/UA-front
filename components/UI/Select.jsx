import React from 'react';
import PropTypes from 'prop-types';

import InputBase from './InputBase';

/**
 * Displays a controlled select
 */
const Select = ({ options, id, label, value, onChange }) => (
  <InputBase
    Component="select"
    options={options}
    id={id}
    label={label}
    value={value}
    onChange={onChange}
  />
);

Select.propTypes = {
  /**
   * id for the input
   */
  id: PropTypes.string.isRequired,
  /**
   * Label to display for the input
   */
  label: PropTypes.string.isRequired,
  /**
   * Controlled value of the input
   */
  value: PropTypes.string.isRequired,
  /**
   * onChange function, receive `event`
   */
  onChange: PropTypes.func.isRequired,
  /**
   * list of option
   */
  options: PropTypes.array.isRequired,
};

export default Select;
