import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './InputBase.css';


/**
 * Main component for input
 */
const InputBase = ({ id, label, placeholder, value, onChange, type, Component, options }) => {
  const wrapperRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsFocus(false);
    }
  };
  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocus]);

  return (
    <div className="input-container">
      <label
        htmlFor={id}
        className={`input-label ${isFocus ? 'focus' : ''}`}
        onClick={() => {
          wrapperRef.current.focus();
          setIsFocus(true);
        }}
      >
        {label}
      </label>
      <div className={`input-value ${isFocus ? 'focus' : ''}`}>
        { Component === 'select'
          ? (
            <Component
              className="input-html"
              ref={wrapperRef}
              type={type}
              id={id}
              name={id}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onClick={() => setIsFocus(true)}
            >
              { options.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>)) }
            </Component>
          )
          : (
            <Component
              className="input-html"
              ref={wrapperRef}
              type={type}
              id={id}
              name={id}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onClick={() => setIsFocus(true)}
            />
          )}
      </div>
    </div>
  );
};

InputBase.propTypes = {
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
  /**
   * Array of option for select
   */
  options: PropTypes.array,
};

InputBase.defaultProps = {
  placeholder: '',
  value: '',
  type: 'text',
  options: [],
};

export default InputBase;