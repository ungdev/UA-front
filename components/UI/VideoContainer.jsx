import React from 'react';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import './VideoContainer.css';

const VideoContainer = ({ style, title, src }) => (
  <div className="video-container" style={style}>
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

export default VideoContainer;