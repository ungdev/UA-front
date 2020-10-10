import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Display an extension panel
 */
const Collapse = ({ title, children, className }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  // Set contentHeight when the visibility change
  const setVisible = (visible) => {
    setContentHeight(contentRef.current.scrollHeight);
    setContentVisible(visible);
  };

  // Set contentHeight when children prop change
  useEffect(() => {
    setContentHeight(contentRef.current.scrollHeight);
  }, [children]);

  return (
    <div className={`collapse ${className} ${contentVisible ? 'active' : ''}`}>
      <div className="collapse-title" onClick={() => setVisible(!contentVisible)}>
        {title}

        <div className="collapse-arrow">
          <i className="fas fa-chevron-down" />
        </div>
      </div>

      <div className="collapse-content" ref={contentRef} style={{ maxHeight: contentVisible ? contentHeight : 0 }}>
        {children}
      </div>
    </div>
  );
};

Collapse.propTypes = {
  /**
   * Title of the panel
   */
  title: PropTypes.node.isRequired,
  /**
   * Content to display when the user clicks on the title
   */
  children: PropTypes.node.isRequired,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Collapse.defaultProps = {
  className: '',
};

export default Collapse;
