import styles from './FillingBar.module.scss';
import { useEffect, useState } from 'react';

/**
 * Renders a component that displays a filling bar.
 */
export default function FillingBar({
  fullness,
  className,
}: {
  /** The fullness of the bar. */
  fullness: number;
  /** An additional class name to the bar. */
  className?: string;
}) {
  const [currentFullness, setCurrentFullness] = useState(0);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setCurrentFullness(fullness);
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    } as IntersectionObserverInit,
  );

  useEffect(() => {
    observer.observe(document.querySelector(`.${styles.fillingBar}`)!);
  }, []);

  return (
    <div
      className={`${styles.fillingBar} ${className}`}
      style={{ '--fullness': currentFullness } as React.CSSProperties}
    />
  );
}
