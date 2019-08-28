import React from 'react';
import PropTypes from 'prop-types';

import './Title.css';

/**
 * Displays a title
 */
const Title = ({ level, children, gutterBottom, align }) => {
  const Component = `h${level}`;
  return (<Component className={`title-${level} ${align} ${gutterBottom ? 'gutterBottom' : ''}`}>{children}</Component>);
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
};

Title.defaultProps = {
  level: 1,
  gutterBottom: true,
  align: 'inherit',
};

export default Title;