import React from 'react';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

/**
 * A container for displaying videos with a responsive aspect ratio.
 * @param title - The title of the video.
 * @param src - The URL of the video.
 * @param className - An optional class name to apply to the container.
 */
const VideoContainer = ({ title, src, className }: { title: string, src: string, className: string }) => (
  <div className={`video-container ${className}`}>
    <div className="video-container-ratio">
      <div className="video-container-full">
        <iframe
          className="lazyload"
          title={title}
          data-src={src}
          allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  </div>
);

export default VideoContainer;