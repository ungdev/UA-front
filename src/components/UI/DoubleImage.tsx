'use client';
import styles from './DoubleImage.module.scss';
import BoxContainer from '@/components/landing/BoxContainer';
import { useState } from 'react';

/**
 * Renders a component that displays two images that can be swapped.
 */
export default function DoubleImage({
  image1,
  image2,
  className = '',
}: {
  /** The first image to display. */
  image1: string;
  /** The second image to display. */
  image2: string;
  /** An optional class name to add to the component. */
  className?: string;
}) {
  const [swapped, setSwapped] = useState(null as boolean | null);

  const swap = () => {
    if (swapped == null) {
      setSwapped(true);
      return;
    }
    setSwapped(!swapped);
  };

  return (
    <div className={`${styles.doubleImage} ${className}`}>
      <BoxContainer
        title="image1.jpg"
        padding={false}
        className={swapped != null ? (swapped ? styles.image1forward : styles.image1backward) : ''}>
        <img src={image1} alt="Information Image" onClick={swap} />
      </BoxContainer>
      <BoxContainer
        title="image.jpg"
        padding={false}
        className={swapped != null ? (swapped ? styles.image2forward : styles.image2backward) : ''}>
        <img src={image2} alt="Information Image" onClick={swap} />
      </BoxContainer>
    </div>
  );
}
