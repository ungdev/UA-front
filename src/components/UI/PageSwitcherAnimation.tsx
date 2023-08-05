'use client';
import { createRef, useEffect, useState } from 'react';
import TournamentInformation from '@/app/tournaments/[id]/page';
import { useRouter } from 'next/navigation';

export default function PageSwitcherAnimation({ nextPage, children }) {
  const router = useRouter();
  // The translation in the X direction (always negative, because the translation is to the left)
  const [translation, setTranslation] = useState(0);
  // True when the animation is finished
  const [redirecting, setRedirecting] = useState(0);
  const ref = createRef();

  const animate = () => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
      setTranslation(-progress * window.innerWidth);
      //ref.current.style.left = -progress * window.innerWidth + 'px';
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setRedirecting(1);

      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!ref.current || translation !== 0) return;
    animate();
  }, [ref]);

  if (!nextPage) {
    return children;
  }

  // We need to render the new page as it will be displayed after the redirection, to avoid a too big reload which will move the camera
  if (redirecting) {
    if (redirecting === 2) {
      router.push(`/tournaments/${nextPage}`);
    }
    else setRedirecting(2);
    return <TournamentInformation tournamentId={nextPage} animate={false} />;
  }

  return (
    <div className="page-switcher-container" ref={ref} style={{ left: translation }}>
      <div className="old">{children}</div>
      <div className="new">
        <TournamentInformation tournamentId={nextPage} animate={false} />
      </div>
    </div>
  );
}
