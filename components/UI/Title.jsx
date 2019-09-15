import React from 'react';
import PropTypes from 'prop-types';

import './Title.css';

/**
 * Displays a title
 */
const Title = ({ level, children, gutterBottom, align, uppercase }) => {
  const Component = `h${level}`;

  return (
    <Component
      className={`title title-${level} ${align} ${gutterBottom ? 'gutterBottom' : ''} ${uppercase ? 'uppercase' : ''}`}
    >
      <div className="title-content">
        {children}
      </div>
    </Component>
  );
};

Title.propTypes = {
  /**
   * Set content importance
   */
  level: PropTypes.oneOf([1, 2, 3, 4]),
  /**
   * The content of the component
   */
  children: PropTypes.node.isRequired,
  /**
   * Enable bottom margin
   */
  gutterBottom: PropTypes.bool,
  /**
   * Set the text-align on the component
   */
  align: PropTypes.oneOf(['inherit', 'center', 'justify', 'left', 'right']),
  /**
   * Should the text be uppercase ?
   */
  uppercase: PropTypes.bool,
};

Title.defaultProps = {
  level: 1,
  gutterBottom: true,
  align: 'inherit',
  uppercase: false,
};

export default Title;