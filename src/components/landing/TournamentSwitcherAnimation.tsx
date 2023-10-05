'use client';
import styles from './TournamentSwitcherAnimation.module.scss';
import { ReactNode, RefObject, createRef, useEffect, useState } from 'react';
import { TournamentInformation } from '@/app/tournaments/[id]/content';
import { useRouter } from 'next/navigation';
import { TournamentHome } from '@/app/tournaments/content';

/**
 * Renders a component that animates the transition between two tournament pages.
 */
export default function TournamentSwitcherAnimation({
  previousPage,
  nextPage,
  children,
}: {
  /** The page that the user is coming from. */
  previousPage?: string;
  /** The page that the user is going to. */
  nextPage?: string | undefined;
  /** The child components to be rendered. */
  children: ReactNode;
}) {
  const router = useRouter();
  // The translation in the X direction (always negative, because the translation is to the left)
  const [translation, setTranslation] = useState(0);
  // True when the animation is finished
  const [redirecting, setRedirecting] = useState(0);
  const ref: RefObject<HTMLDivElement> = createRef();

  const animate = () => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = easingFunction(Math.min((timestamp - startTimestamp) / 500, 1));
      setTranslation(progress * window.innerWidth);
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

  function easingFunction(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  if (nextPage === undefined) {
    return children;
  }

  // We need to render the new page as it will be displayed after the redirection, to avoid a too big reload which will move the camera
  if (redirecting) {
    if (redirecting === 2) {
      const queryParams = nextPage === '' ? `?tournament=${previousPage}&firstAnimation=${false}` : '';
      router.push(`/tournaments/${nextPage}${queryParams}`, {
        scroll: false,
      });
    } else setRedirecting(2);
    if (nextPage === '') return <TournamentHome animations={'none'} defaultTournamentId={previousPage} />;
    return <TournamentInformation tournamentId={nextPage} animate={false} />;
  }

  const left = nextPage === '' ? <TournamentHome animations={'none'} defaultTournamentId={previousPage} /> : children;
  const right = nextPage === '' ? children : <TournamentInformation tournamentId={nextPage} animate={false} />;
  const style = {
    left: `${nextPage === '' ? translation - window.innerWidth : -translation}px`,
  };

  return (
    <div className={styles.pageSwitcherContainer} ref={ref} style={style}>
      <div className={styles.left}>{left}</div>
      <div className={styles.right}>{right}</div>
    </div>
  );
}
