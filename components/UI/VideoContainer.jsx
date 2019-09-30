import React from 'react';
import PropTypes from 'prop-types';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import './VideoContainer.css';

/**
 * Displays iframe and keeps 16:9 ratio
 */
const VideoContainer = ({ title, src, className }) => (
  <div className={`video-container ${className}`}>
    <div className="video-container-ratio">
      <div className="video-container-full">
        <iframe
          className="lazyload"
          title={title}
          data-src={src}
          frameBorder="0"
          allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  </div>
);

VideoContainer.propTypes = {
  /**
   * Title of the iframe
   */
  title: PropTypes.string,
  /**
   * Source of the iframe
   */
  src: PropTypes.string.isRequired,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

VideoContainer.defaultProps = {
  title: '',
  className: '',
};

export default VideoContainer;