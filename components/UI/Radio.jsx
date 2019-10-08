import React from 'react';
import PropTypes from 'prop-types';

import './Radio.css';

const Radio = ({ options, name, value, onChange, row, className }) => (
  <div className={`radio ${row && 'row'} ${className}`}>
    { options.map((option) => (
      <label key={option.value}>
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
        />

        <div className="radio-value"><i className="far fa-circle" /></div>

        {option.name}
      </label>
    )) }
  </div>
);

Radio.propTypes = {
  /**
   * Available values
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  /**
   * Value of the field
   */
  value: PropTypes.string.isRequired,
  /**
   * Function triggered when the value change
   */
  onChange: PropTypes.func,
  /**
   * Used to identify a group of radio inputs
   */
  name: PropTypes.string.isRequired,
  /**
   * Should the inputs be in a row ?
   */
  row: PropTypes.bool,
  /**
   * Class to apply to the container
   */
  className: PropTypes.string,
};

Radio.defaultProps = {
  onChange: () => {},
  row: false,
  className: '',
};

export default Radio;