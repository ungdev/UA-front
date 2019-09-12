import React from 'react';
import PropTypes from 'prop-types';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import './VideoContainer.css';

/**
 * Displays iframe and keep 16:9 ratio
 */
const VideoContainer = ({ className, title, src }) => (
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
   * Class to apply in the div container
   */
  className: PropTypes.string,
  /**
   * title for the iframe
   */
  title: PropTypes.string,
  /**
   * Source for the iframe
   */
  src: PropTypes.string.isRequired,
};

VideoContainer.defaultProps = {
  className: '',
  title: '',
};

export default VideoContainer;