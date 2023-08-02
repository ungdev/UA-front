'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function AppearFromSide({
  children,
  fromRight = false,
  deactivated = false,
  smooth = true,
}: {
  children: React.ReactNode;
  fromRight?: boolean;
  deactivated?: boolean;
  smooth?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [translateXData, setTranslateXData] = useState({
    offset: document.body.clientWidth * (fromRight ? 1 : -1),
    position: document.body.clientWidth * (fromRight ? -1 : 1),
    lastOffset: document.body.clientWidth * (fromRight ? 1 : -1),
  });
  const ref = useRef();

  const animation = () => {
    // It can be undefined if user changes page while the component is on screen
    if (!ref.current) return;
    const rect = (ref.current as any).getBoundingClientRect();
    const progression = Math.max(Math.min(2 * (1 - rect.top / window.innerHeight), 1), 0);
    const defaultSidePosition = smooth
      ? fromRight
        ? (window.innerWidth - rect.width) / 2
        : window.innerWidth - (window.innerWidth - rect.width) / 2
      : translateXData.position - translateXData.lastOffset;
    setTranslateXData({
      offset: fromRight
        ? (1 - progression) * (window.innerWidth - defaultSidePosition)
        : (progression - 1) * defaultSidePosition,
      position: fromRight ? rect.left : rect.right,
      lastOffset: translateXData.offset,
    });
  };

  useEffect(() => {
    new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        root: document.body,
        rootMargin: '0px 100% 0px 100%',
        threshold: 0,
      } as IntersectionObserverInit,
    ).observe(ref.current!);
    const rect = (ref.current as any).getBoundingClientRect();
    setTranslateXData({
      offset: fromRight ? window.innerWidth - rect.left : -rect.right,
      position: fromRight ? rect.left : rect.right,
      lastOffset: 0,
    });
  }, []);

  useEffect(() => {
    if (visible && !deactivated) {
      requestAnimationFrame(animation);
    }
  }, [visible, translateXData]);

  return React.cloneElement(children as any, {
    style: deactivated
      ? undefined
      : {
          transform: `translateX(${translateXData.offset}px)`,
          transition: smooth ? 'transform 0.1s linear' /* ease-out aussi est bien */ : undefined,
        },
    ref,
  });
}
