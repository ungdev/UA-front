'use client';
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
    <div className={`double-image ${className}`}>
      <BoxContainer
        title="image.jpg"
        padding={false}
        className={swapped != null ? (swapped ? 'image1forward' : 'image1backward') : ''}>
        <img src={image1} alt="Information Image" onClick={swap} />
      </BoxContainer>
      <BoxContainer
        title="image.jpg"
        padding={false}
        className={swapped != null ? (swapped ? 'image2forward' : 'image2backward') : ''}>
        <img src={image2} alt="Information Image" onClick={swap} />
      </BoxContainer>
    </div>
  );
}
