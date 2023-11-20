'use client';
import { useEffect, useRef } from 'react';
import styles from './YoutubeVideoContainer.module.scss';

/**
 * A container for displaying videos with a responsive aspect ratio.
 */
const YoutubeVideoContainer = ({
  id,
  className = '',
}: {
  /** The ID of the video. */
  id: string;
  /** An optional class name to apply to the container. */
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const loadVideo = () => {
    /*
     * Based on:
     * Light YouTube Embeds by @labnol
     * Credit: https://www.labnol.org/
     */

    function labnolIframe(div: HTMLDivElement) {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '1');
      iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      div.appendChild(iframe);
    }

    const videoId = ref.current!.dataset.id;
    const div = document.createElement('div');
    div.setAttribute('data-id', videoId!);
    const thumbNode = document.createElement('img');
    thumbNode.src = `//i.ytimg.com/vi/${videoId}/0.jpg`;
    thumbNode.alt = 'Youtube Video';
    div.appendChild(thumbNode);
    const playButton = document.createElement('div');
    playButton.setAttribute('class', styles.play);
    div.appendChild(playButton);
    div.onclick = function () {
      labnolIframe(ref.current!);
    };
    ref.current!.appendChild(div);
  };

  useEffect(() => {
    setTimeout(() => {
      loadVideo();
    }, 500);
  }, []);

  return <div ref={ref} className={`${styles.videoContainer} ${className}`} data-id={id}></div>;
};

export default YoutubeVideoContainer;
