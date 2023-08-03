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
  const [swapped, setSwapped] = useState(false);

  console.log(swapped); // Ok wtf, without this line the swap is not consistent

  return (
    <div className={`double-image ${className}`}>
      <BoxContainer title="image.jpg" padding={false}>
        <img
          src={swapped ? image2 : image1}
          alt="Information Image"
          className=""
          onClick={() => setSwapped(!swapped)}
        />
      </BoxContainer>
      <BoxContainer title="image.jpg" padding={false}>
        <img
          src={swapped ? image1 : image2}
          alt="Information Image"
          className=""
          onClick={() => setSwapped(!swapped)}
        />
      </BoxContainer>
    </div>
  );
}
