'use client';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ScrollingParallaxElement } from '@/components/UI/ScrollingParallaxElement';

export default function ScrollingParallax({ children }: { children: React.ReactNode[] }) {
  interface ChildDataType {
    speed: number;
    distanceToTop: number;
    additionalScroll: number;
    visible: boolean;
  }
  if (!Array.isArray(children)) {
    children = [children];
  }
  const childrenDataInit: ChildDataType[] = [];
  const refs: MutableRefObject<HTMLElement | undefined>[] = [];
  for (let i = 0; i < children.length; i++) {
    if (children[i].type !== ScrollingParallaxElement) {
      continue;
    }
    childrenDataInit.push({
      speed: children[i].props.speed,
      distanceToTop: 0,
      additionalScroll: 0,
      visible: false,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    refs.push(useRef<HTMLElement>());
  }
  const [childrenData, setChildrenData] = useState(childrenDataInit);

  // We don't use the onScroll event because it is insanely slow to run
  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    // We save this for performance reasons. If the user hasn't scrolled for a while (300ms), we don't need to refresh as often (we can wait 100ms)
    // const lastScroll = 0;
    // We need to redefine this variable because the state is not updated in the animation function
    // So each time we will update the state, we will also update this variable using the function below
    let childrenData: ChildDataType[] = childrenDataInit;
    const updateChildrenData = (value: ChildDataType[]) => {
      childrenData = value;
      setChildrenData(value);
    };
    const parallax = () => {
      const newChildrenData: ChildDataType[] = [];
      // const now = Date.now();
      for (let i = 0; i < childrenData.length; i++) {
        const data = childrenData[i];
        const bb = refs[i].current!.getBoundingClientRect();
        const scroll = -window.scrollY * (data.speed - 1);
        const visible =
          (data.visible ? bb.top : bb.top - data.distanceToTop + data.additionalScroll) < window.innerHeight &&
          (data.visible ? bb.bottom : bb.bottom - data.distanceToTop + data.additionalScroll) > 0;
        const distanceToTop = !visible ? data.distanceToTop - bb.top : 0;
        // const waitLongerForNextUpdate = scroll === data.additionalScroll && now - data.lastScroll > 300;
        /*
        if (scroll !== additionalScroll) {
          lastScroll = now;
        }
        */
        newChildrenData.push({ speed: data.speed, additionalScroll: scroll, visible, distanceToTop });
      }
      updateChildrenData(newChildrenData);
      requestAnimationFrame(parallax);
    };
    requestAnimationFrame(parallax);
  };

  /*
  if (visible !== lastVisibility) {
    setLastVisibility(visible);
  }
  */

  let i = 0;
  return children.map((child) => {
    if (child.type !== ScrollingParallaxElement) {
      return child;
    } else {
      const childData = childrenData[i];
      return React.cloneElement(child.props.children, {
        ref: refs[i++],
        style: {
          visibility: /*lastVisibility &&*/ childData.visible ? undefined : 'hidden',
          transform: `translateY(${childData.visible ? childData.additionalScroll : childData.distanceToTop}px)`,
          // Ok, in the future it would be nice to have a smoothing there, for performance reasons (and call the animation function less often)
          /*transition: lastVisibility === visible ? 'transform 0.0s linear',  : undefined,*/
        },
      });
    }
  });
}
