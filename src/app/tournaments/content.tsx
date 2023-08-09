'use client';
import Button from '@/components/UI/Button';
import { useEffect, useRef, useState } from 'react';
import { Icon, Title } from '@/components/UI';
import Link from 'next/link';
import { tournaments } from '@/lib/tournaments';
import Divider from '@/components/UI/Divider';
import PageSwitcherAnimation from '@/components/landing/PageSwitcherAnimation';

export const TournamentHome = ({
  animations,
  defaultTournamentId,
  onDefaultTournamentSet = () => {},
}: {
  animations: 'all' | 'none' | 'except-first';
  defaultTournamentId?: string;
  onDefaultTournamentSet?: () => void;
}) => {
  const fadeDuration = animations !== 'none' ? 200 : 0;
  //const dispatch = useAppDispatch();
  //const tournaments = useAppSelector((state) => state.tournament.tournaments);
  // This is initialized when tournaments are fetched
  const [selectedTournamentIndex, setSelectedTournamentIndex] = useState(-1);
  const [renderedTournamentIndex, setRenderedTournamentIndex] = useState(-1);
  const [lastFading, setLastFading] = useState(animations === 'all' ? Date.now() : 0);
  // Only used for force-updating the component
  const [updater, setUpdater] = useState(false);
  const [nextUrl, setNextUrl] = useState('');

  const tournamentList = useRef<HTMLDivElement>(null);
  const leftArrow = useRef<HTMLDivElement>(null);
  const rightArrow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tournaments) {
      //dispatch(fetchTournaments());
    }
  }, []);

  const findClosestChildren = (tournamentList: HTMLDivElement, tournamentListRect: DOMRect) => {
    const tournamentListChildren = tournamentList.children;
    const tournamentListCenter = tournamentListRect.left + tournamentListRect.width / 2;
    let closestChild = tournamentListChildren[0];
    let closestChildDistance = Infinity;
    for (let i = 0; i < tournamentListChildren.length; i++) {
      const child = tournamentListChildren[i];
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const childDistance = Math.abs(childCenter - tournamentListCenter);
      if (childDistance < closestChildDistance) {
        closestChild = child;
        closestChildDistance = childDistance;
      }
    }
    return closestChild;
  };

  const onTournamentListScroll = () => {
    if (!tournamentList.current) return;

    // Logic for navigation arrows
    const currentScroll =
      window.innerWidth > 1024 ? tournamentList.current.scrollTop : tournamentList.current.scrollLeft;
    const tournamentListRect = tournamentList.current.getBoundingClientRect();

    const isLeft = currentScroll < 10;
    const isRight =
      window.innerWidth > 1024
        ? currentScroll - tournamentList.current.children[0].clientHeight > tournamentList.current.scrollWidth - 10
        : currentScroll + tournamentListRect.width > tournamentList.current.scrollWidth - 10;

    // left/top side
    if (isLeft) {
      if (leftArrow.current) leftArrow.current.classList.add('hidden');
      if (tournamentList.current) tournamentList.current.classList.remove('fade-top');
    } else {
      if (leftArrow.current) leftArrow.current.classList.remove('hidden');
      if (tournamentList.current) tournamentList.current.classList.add('fade-top');
    }

    // right/bottom side
    if (isRight) {
      if (rightArrow.current) rightArrow.current.classList.add('hidden');
      if (tournamentList.current) tournamentList.current.classList.remove('fade-bottom');
    } else {
      if (rightArrow.current) rightArrow.current.classList.remove('hidden');
      if (tournamentList.current) tournamentList.current.classList.add('fade-bottom');
    }

    // if screen is too large (max-width: 1024px), don't do anything more
    if (window.innerWidth > 1024) return;

    let closestChild = findClosestChildren(tournamentList.current, tournamentListRect);
    const tournamentListChildren = tournamentList.current.children;

    // if scroll x is 0, select the first tournament
    if (isLeft) {
      closestChild = tournamentListChildren[0];
    }

    // if scroll x is at the end, select the last tournament
    if (isRight) {
      closestChild = tournamentListChildren[tournamentListChildren.length - 1];
    }

    const tournamentId = closestChild.getAttribute('data-index');
    if (tournamentId) {
      selectTournament(parseInt(tournamentId));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setUpdater(!updater); // Force-update the component
    }, fadeDuration);
  }, [selectedTournamentIndex]);

  const selectTournament = (i: number, changeLastFading = true) => {
    if (i === selectedTournamentIndex) return;
    setSelectedTournamentIndex(i);
    if (changeLastFading) setLastFading(Date.now());
  };

  // Initialize the selected tournament
  if (tournaments && selectedTournamentIndex === -1) {
    if (!defaultTournamentId) {
      selectTournament(0);
    } else {
      onDefaultTournamentSet();
      selectTournament(
        tournaments.findIndex((t) => t.id === defaultTournamentId),
        false,
      );
    }
  }

  const scrollInTournamentList = (isScrollLeftOrTop: boolean) => {
    if (!tournamentList.current) return;
    const scrollAmount = 350;
    if (window.innerWidth > 1024) {
      tournamentList.current.scrollBy({ top: isScrollLeftOrTop ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    } else {
      // scroll to the next tournament
      const tournamentListChildren = tournamentList.current.children;
      const tournamentListRect = tournamentList.current.getBoundingClientRect();

      const closestChild = findClosestChildren(tournamentList.current, tournamentListRect);

      const tournamentId = closestChild.getAttribute('data-index');
      if (tournamentId) {
        const nextTournament = tournamentListChildren[parseInt(tournamentId) + (isScrollLeftOrTop ? -1 : 1)];

        // Scroll to center of the next tournament
        tournamentList.current.scrollTo({
          left:
            nextTournament.getBoundingClientRect().left -
            tournamentListRect.left +
            tournamentList.current.scrollLeft -
            tournamentListRect.width / 2 +
            nextTournament.getBoundingClientRect().width / 2,
          behavior: 'smooth',
        });
      }
    }
  };

  const renderedTournament = tournaments[renderedTournamentIndex];

  const fading = Date.now() - lastFading < fadeDuration;
  if (!fading && renderedTournamentIndex !== selectedTournamentIndex) {
    setRenderedTournamentIndex(selectedTournamentIndex);
    document.documentElement.style.setProperty(
      '--background-image',
      `url("${tournaments[selectedTournamentIndex].backgroundImage}")`,
    );
  }

  if (renderedTournamentIndex === -1) {
    return (
      <PageSwitcherAnimation nextPage={undefined}>
        <div className={`tournament-container ${fading ? 'fading' : ''}`} />
      </PageSwitcherAnimation>
    );
  }

  return (
    <PageSwitcherAnimation nextPage={!nextUrl ? undefined : nextUrl}>
      <div className={`tournament-container ${fading ? 'fading' : ''}`}>
        <div className="page-title">
          <Divider is_white />
          <Title align="center">Tournois</Title>
          <Divider is_white />
        </div>
        <div className="content">
          <div className="tournament-scroll-container">
            <div className="arrow hidden" ref={leftArrow}>
              <Button onClick={() => scrollInTournamentList(true)}>
                <Icon name="chevron-up" fill={false} strokeWidth={3} />
              </Button>
            </div>
            <div className="arrow" ref={rightArrow}>
              <Button onClick={() => scrollInTournamentList(false)}>
                <Icon name="chevron-bottom" fill={false} strokeWidth={3} />
              </Button>
            </div>
            <div className="tournaments-list fade-bottom" ref={tournamentList} onScroll={onTournamentListScroll}>
              {!tournaments
                ? 'Chargement des tournois...'
                : tournaments.map((tournament, i) => (
                    <img
                      key={tournament.id}
                      src={tournament.image}
                      alt={`Logo ${tournament.name}`}
                      data-index={i}
                      className={`tournament ${i === selectedTournamentIndex ? 'selected' : ''}`}
                      onClick={() => selectTournament(i)}
                    />
                  ))}
            </div>
          </div>
          <div className={`tournament-info ${fading ? 'fading' : ''}`}>
            <h2>{renderedTournament.name}</h2>
            <p>
              <strong>{renderedTournament.cashprize}€</strong> de cashprize ·{' '}
              <strong>{renderedTournament.maxPlayers / renderedTournament.playersPerTeam} équipes </strong>
              <br />
            </p>
            <p>
              Casté par <strong>{renderedTournament.caster}</strong>
            </p>
            <Link href={``} scroll={false}>
              <Button primary outline onClick={() => setNextUrl(renderedTournament.id)}>
                Plus d'infos
              </Button>
            </Link>
            <Link href={`/dashboard`} scroll={false}>
              <Button primary>S'inscrire</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageSwitcherAnimation>
  );
};
