import styles from './DoubleFillingBar.module.scss';
import { useEffect, useState, useRef } from 'react';

/**
 * Renders a component that displays a filling bar with two levels.
 */
export default function FillingBar({
  fullness,
  partialFullness,
  className,
}: {
  /** The total fullness of the bar (teams locked). */
  fullness: number;
  /** The partial fullness of the bar (teams partially paid). */
  partialFullness?: number;
  /** An additional class name to the bar. */
  className?: string;
}) {
  const [currentFullness, setCurrentFullness] = useState(0);
  const [currentPartialFullness, setCurrentPartialFullness] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentFullness(fullness);
          setCurrentPartialFullness(partialFullness || 0);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, [fullness, partialFullness]);

  return (
    <div
      ref={barRef}
      className={`${styles.fillingBar} ${className}`}
      style={
        {
          '--fullness': currentFullness,
          '--partial-fullness': currentPartialFullness,
        } as React.CSSProperties
      }>
      <div className={styles.partialBar} />
      <div className={styles.fullBar} />
    </div>
  );
}
