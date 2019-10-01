import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import './Collapse.css';

const updateBackground = (e) => {
  const bg = e.target.getAttribute('data-bg');
  if (bg) {
    e.target.style.backgroundImage = `url(${bg})`;
  }
};

/**
 * Display an extension panel
 */
const Collapse = ({ title, children, imgSrc, className }) => {
  const wrapperRef = useRef(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('lazybeforeunveil', updateBackground);

    if (wrapperRef.current && wrapperRef.current.className.includes('lazyloaded')) {
      wrapperRef.current.style.backgroundImage = `url(${imgSrc})`;
    }

    return () => {
      document.removeEventListener('lazybeforeunveil', updateBackground);
    };
  });

  return (
    <div className={`card ${className}`}>
      <div className="title" onClick={() => setContentVisible(!contentVisible)}>
        {title}
        { children && (
          <div className={`arrow ${contentVisible ? 'open' : ''}`}>
            <i className="fas fa-chevron-down" />
          </div>
        )}
      </div>
      { imgSrc && (
        <div
          className="img lazyload"
          onClick={() => setContentVisible(!contentVisible)}
          data-bg={imgSrc}
          ref={wrapperRef}
        />
      )}
      { children && (
        <div className={`content ${contentVisible ? 'open' : ''}`}>
          <div className="text">
            {children}
          </div>
        </div>
      )}
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
   * Source of the image
   */
  imgSrc: PropTypes.string,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Collapse.defaultProps = {
  imgSrc: '',
  className: '',
};

export default Collapse;