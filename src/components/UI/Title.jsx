import React from 'react';
import PropTypes from 'prop-types';
import Divider from './Divider';

/**
 * Displays a title
 */
const Title = ({ level, children, gutterBottom, align, className, id }) => {
  const Component = `h${level}`;

  return (
    <Component id={id} className={`title title-${level} ${className} ${align} ${gutterBottom ? 'gutterBottom' : ''}`}>
      {level === 2 ? (
        <>
          <div className={`title-content ${className} ${align} ${gutterBottom ? 'gutterBottom' : ''}`}>{children}</div>
          <Divider />
        </>
      ) : (
        <div className="title-content">{children}</div>
      )}
      {/* </div> */}
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
   * Class of the container
   */
  className: PropTypes.string,
  /**
   * Id of the container
   */
  id: PropTypes.string,
};

Title.defaultProps = {
  level: 1,
  gutterBottom: true,
  align: 'inherit',
  className: '',
  id: undefined,
};

export default Title;
