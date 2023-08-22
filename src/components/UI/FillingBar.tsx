import { useEffect, useState } from 'react';

/**
 * Renders a component that displays a filling bar.
 */
export default function FillingBar({
  fullness,
}: {
  /** The fullness of the bar. */
  fullness: number;
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
    observer.observe(document.querySelector('.filling-bar')!);
  }, []);

  return <div className="filling-bar" style={{ '--fullness': currentFullness } as React.CSSProperties} />;
}
