'use client';
import BoxContainer from '@/components/landing/BoxContainer';
import { useState } from 'react';

export default function DoubleImage({
  image1,
  image2,
  className = '',
}: {
  image1: string;
  image2: string;
  className?: string;
}) {
  const [swapped, setSwapped] = useState(null as boolean | null);

  console.log(swapped); // Ok wtf, without this line the swap is not consistent

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
