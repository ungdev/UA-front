'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ScrollingParallax({ speed, children }: { speed: number; children: React.ReactNode }) {
  const [additionalScroll, setAdditionalScroll] = useState(0);
  const [distanceToTop, setDistanceToTop] = useState(0);
  const [visible, setVisible] = useState(false);
  const [lastVisibility, setLastVisibility] = useState(false);
  const ref = useRef<HTMLElement>();

  //console.log(children);

  // We don't use the onScroll event because it is insanely slow to run
  useEffect(() => {
    if (!ref.current) return;
    //console.log("use effect");
    startAnimation();
  }, []);

  const startAnimation = () => {
    // We save this for performance reasons. If the user hasn't scrolled for a while (300ms), we don't need to refresh as often (we can wait 100ms)
    let lastScroll = 0;
    // We need to redefine these variables because the state is not updated in the animation function
    // So each time we will update the state, we will also update these variables using the functions below
    let distanceToTop = 0;
    let additionalScroll = 0;
    let visible = false;
    //console.log("startAnimation");
    const updateDistanceToTop = (value: number) => {
      distanceToTop = value;
      setDistanceToTop(value);
    };
    const updateAdditionalScroll = (value: number) => {
      additionalScroll = value;
      setAdditionalScroll(value);
    };
    const updateVisible = (value: boolean) => {
      visible = value;
      setVisible(value);
    };
    const parallax = () => {
      const bb = ref.current!.getBoundingClientRect();
      const scroll = -window.scrollY * (speed - 1);
      updateVisible(
        (visible ? bb.top : bb.top - distanceToTop + additionalScroll) < window.innerHeight &&
          (visible ? bb.bottom : bb.bottom - distanceToTop + additionalScroll) > 0,
      );
      //console.log(`before : ${distanceToTop}`);
      //updateDistanceToTop(0);
      updateDistanceToTop(!visible ? distanceToTop - bb.top : 0);
      //console.log(`after : ${distanceToTop}`);
      //console.log(distanceToTop);
      const now = Date.now();
      if (scroll === additionalScroll && now - lastScroll > 300) {
        requestAnimationFrame(parallax);
      } else {
        updateAdditionalScroll(scroll);
        if (scroll !== additionalScroll) {
          lastScroll = now;
        }
        requestAnimationFrame(parallax);
      }
    };
    requestAnimationFrame(parallax);
  };

  if (visible !== lastVisibility) {
    setLastVisibility(visible);
  }

  return React.cloneElement(children, {
    ref,
    style: {
      visibility: lastVisibility && visible ? undefined : 'hidden',
      transform: `translateY(${visible ? additionalScroll : distanceToTop}px)`,
      // Ok, in the future it would be nice to have a smoothing there, for performance reasons (and call the animation function less often)
      transition: lastVisibility === visible ? 'transform 0.0s linear' : undefined,
    },
  });
}
