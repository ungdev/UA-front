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
  const [lastVisibilities, setLastVisibilities] = useState<boolean[]>(Array(childrenData.length).fill(false));

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
        // Stop the animation if the element does not exist anymore (we changed page)
        if (!refs[i]) return;
        const data = childrenData[i];
        const bb = refs[i].current!.getBoundingClientRect();
        const scroll = -window.scrollY * (data.speed - 1);
        const visible =
          (data.visible ? bb.top : bb.top - data.distanceToTop + data.additionalScroll) < window.innerHeight &&
          (data.visible ? bb.bottom : bb.bottom - data.distanceToTop + data.additionalScroll) > 0;
        const distanceToTop = !visible ? data.distanceToTop - bb.top : 0;
        // Implementing a system where if user has not scrolled for a while we can wait longer for the next update would maybe be great
        // const waitLongerForNextUpdate = scroll === data.additionalScroll && now - data.lastScroll > 300;
        /*
        if (scroll !== additionalScroll) {
          lastScroll = now;
        }
        */
        newChildrenData.push({
          speed: data.speed,
          additionalScroll: scroll,
          visible,
          distanceToTop,
        });
      }
      updateChildrenData(newChildrenData);
      setTimeout(() => requestAnimationFrame(parallax), 50);
    };
    requestAnimationFrame(parallax);
  };

  let i = 0;
  let updatedData = false;
  const newLastVisibilities = [...lastVisibilities];
  const ret = children.map((child) => {
    if (child.type !== ScrollingParallaxElement) {
      return child;
    } else {
      const childData = childrenData[i];
      const parallaxChild = React.cloneElement(child.props.children, {
        ref: refs[i],
        style: {
          visibility: childData.visible && lastVisibilities[i] ? undefined : 'hidden',
          transform: `translateY(${childData.visible ? childData.additionalScroll : childData.distanceToTop}px)`,
          transition: childData.visible && lastVisibilities[i] ? 'transform 0.04s linear' : undefined,
        },
      });
      if (childData.visible !== lastVisibilities[i]) {
        newLastVisibilities[i] = childData.visible;
        updatedData = true;
      }
      i++;
      return parallaxChild;
    }
  });
  if (updatedData) {
    setTimeout(() => setLastVisibilities(newLastVisibilities), 40);
  }
  return ret;
}
