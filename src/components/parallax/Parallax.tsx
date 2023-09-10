'use client';
import styles from './Parallax.module.scss';
import React, { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import ParallaxElementSettings from '@/components/parallax/ParallaxElementSettings';

export default function Parallax({ className, children }: { className: string; children: React.ReactNode[] }) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  const additionalScrollsInit: number[] = [];
  const refs: MutableRefObject<HTMLDivElement | undefined>[] = [];
  let error = false;
  for (let i = 0; i < children.length; i++) {
    if ((children[i]! as React.ReactElement).type !== ParallaxElementSettings) {
      console.error('Children of Parallax component should be components of type ParallaxElementSettings');
      error = true;
      continue;
    }
    additionalScrollsInit.push(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    refs.push(useRef<HTMLDivElement>());
  }
  const [additionalScrolls, setAdditionalScrolls] = useState(additionalScrollsInit);

  // We don't use the onScroll event because it is insanely slow to run
  useEffect(() => {
    if (!error) requestAnimationFrame(parallax);
  }, []);

  const parallax = () => {
    // const now = Date.now();
    for (let i = 0; i < additionalScrolls.length; i++) {
      // Stop the animation if the element does not exist anymore (we changed page)
      if (!refs[i]) return;
      // Implementing a system where if user has not scrolled for a while we can wait longer for the next update would maybe be great
      // const waitLongerForNextUpdate = scroll === data.additionalScroll && now - data.lastScroll > 300;
      /*
      if (scroll !== additionalScroll) {
        lastScroll = now;
      }
      */
      additionalScrolls[i] = -window.scrollY * ((children[i]! as React.ReactElement).props.speed - 1);
    }
    setAdditionalScrolls([...additionalScrolls]);
    setTimeout(() => requestAnimationFrame(parallax), 100);
  };

  if (error) {
    return false;
  }

  return (
    <div className={`${styles.parallax} ${className}`}>
      {children.map((child, i) => (
        <div
          key={i}
          className={`${styles.parallaxElement} ${(child! as React.ReactElement).props.className}`}
          ref={refs[i] as LegacyRef<HTMLDivElement>}
          style={{
            transform: `translateY(${additionalScrolls[i]}px)`,
          }}>
          {child}
        </div>
      ))}
    </div>
  );
}
