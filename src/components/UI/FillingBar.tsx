import { useEffect, useState } from 'react';

export default function FillingBar({ fullness }: { fullness: number }) {
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

  return <div className="filling-bar" style={{ '--fullness': currentFullness }} />;
}
