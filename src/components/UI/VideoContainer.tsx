import styles from './VideoContainer.module.scss';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

/**
 * A container for displaying videos with a responsive aspect ratio.
 */
const VideoContainer = ({
  title = '',
  src,
  className = '',
}: {
  /** The title of the video. */
  title?: string;
  /** The URL of the video. */
  src: string;
  /** An optional class name to apply to the container. */
  className?: string;
}) => (
  <div className={`${styles.videoContainer} ${className}`}>
    <iframe
      className="lazyload"
      title={title}
      data-src={src}
      allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture"
      allowFullScreen
    />
  </div>
);

export default VideoContainer;
