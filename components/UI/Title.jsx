import React from 'react';
import PropTypes from 'prop-types';

import './Title.css';

/**
 * Displays a title
 */
const Title = ({ level, children, gutterBottom, align, uppercase, className }) => {
  const Component = `h${level}`;

  return (
    <Component
      className={`title title-${level} ${className} ${align} ${gutterBottom ? 'gutterBottom' : ''} ${uppercase ? 'uppercase' : ''}`}
    >
      <div className="title-content">
        {children}
      </div>
    </Component>
  );
};

Title.propTypes = {
  /**
   * Set title importance
   */
  level: PropTypes.oneOf([1, 2, 3, 4]),
  /**
   * Content of the title
   */
  children: PropTypes.node.isRequired,
  /**
   * Enable bottom margin
   */
  gutterBottom: PropTypes.bool,
  /**
   * text-align of the component
   */
  align: PropTypes.oneOf(['inherit', 'center', 'justify', 'left', 'right']),
  /**
   * Should the text be uppercase ?
   */
  uppercase: PropTypes.bool,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Title.defaultProps = {
  level: 1,
  gutterBottom: true,
  align: 'inherit',
  uppercase: false,
  className: '',
};

export default Title;