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
const Collapse = ({ title, children, imgSrc }) => {
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
    <div className="card">
      <div className="title" onClick={() => setContentVisible(!contentVisible)}>
        {title}
        { children && (
          <div className={`arrow ${contentVisible ? 'open' : ''}`}>
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
          </div>
        )}
      </div>
      { imgSrc
        && <div className="img lazyload" onClick={() => setContentVisible(!contentVisible)} data-bg={imgSrc} ref={wrapperRef} />}
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
  title: PropTypes.any.isRequired,
  /**
   * Display image below the title
   */
  imgSrc: PropTypes.string,
  /**
   * Content to hide
   */
  children: PropTypes.node,
};

Collapse.defaultProps = {
  children: undefined,
  imgSrc: undefined,
};

export default Collapse;