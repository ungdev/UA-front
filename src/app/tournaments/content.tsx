'use client';
import styles from './style.module.scss';
import Button from '@/components/UI/Button';
import { useEffect, useRef, useState } from 'react';
import { Icon, Title } from '@/components/UI';
import Link from 'next/link';
import Divider from '@/components/UI/Divider';
import TournamentSwitcherAnimation from '@/components/landing/TournamentSwitcherAnimation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getTournamentBackgroundLink, getTournamentImageLink } from '@/utils/uploadLink';
import { IconName } from '@/components/UI/Icon';
import { type Action } from '@reduxjs/toolkit';
import { setLoginModalVisible } from '@/modules/loginModal';
import { setRedirect } from '@/modules/redirect';
import { Tournament } from '@/types';

export function TournamentHome({
  animations,
  defaultTournamentId,
  onDefaultTournamentSet = () => {},
  scroll = false,
  onScrolled = () => {},
}: {
  animations: 'all' | 'none' | 'except-first';
  defaultTournamentId?: string;
  onDefaultTournamentSet?: () => void;
  scroll?: boolean;
  onScrolled?: () => void;
}) {
  const fadeDuration = animations !== 'none' ? 200 : 0;
  const dispatch = useAppDispatch();
  const login = useAppSelector((state) => state.settings.login);
  const tournaments = useAppSelector((state) =>
    state.tournament.tournaments?.toSorted((a: Tournament, b: Tournament) => a.position - b.position),
  );
  
  // This is initialized when tournaments are fetched
  const [selectedTournamentIndex, setSelectedTournamentIndex] = useState(-1);
  const [renderedTournamentIndex, setRenderedTournamentIndex] = useState(-1);
  const [lastFading, setLastFading] = useState(animations === 'all' ? Date.now() : 0);
  // Only used for force-updating the component. To force-update, call setUpdater(Math.random())
  // The value needs to be a random number and not a simple boolean toggle because it is used in a callback, in which we can't know the current value of the state
  const [, setUpdater] = useState(0);
  const [nextUrl, setNextUrl] = useState('');

  const root = useRef<HTMLDivElement | null>(null);
  const tournamentList = useRef<HTMLDivElement | null>(null);
  const leftArrow = useRef<HTMLDivElement | null>(null);
  const rightArrow = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scroll && root.current) {
      root.current!.scrollIntoView({ behavior: 'smooth' });
      onScrolled();
    }
  }, [root.current, scroll]);

  useEffect(() => {
    setTimeout(() => {
      setUpdater(Math.random()); // Force-update the component
    }, fadeDuration);
  }, [selectedTournamentIndex]);

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
      window.innerWidth > 1024 ? tournamentList.current!.scrollTop : tournamentList.current!.scrollLeft;
    const tournamentListRect = tournamentList.current!.getBoundingClientRect();

    const isLeft = currentScroll < 10;
    const isRight =
      window.innerWidth > 1024
        ? currentScroll + tournamentListRect.height > tournamentList.current!.scrollHeight - 10
        : currentScroll + tournamentListRect.width > tournamentList.current!.scrollWidth - 10;

    // left/top side
    if (isLeft) {
      if (leftArrow.current) leftArrow.current!.classList.add(styles.hidden);
      if (tournamentList.current) tournamentList.current!.classList.remove(styles.fadeTop);
    } else {
      if (leftArrow.current) leftArrow.current!.classList.remove(styles.hidden);
      if (tournamentList.current) tournamentList.current!.classList.add(styles.fadeTop);
    }

    // right/bottom side
    if (isRight) {
      if (rightArrow.current) rightArrow.current!.classList.add(styles.hidden);
      if (tournamentList.current) tournamentList.current!.classList.remove(styles.fadeBottom);
    } else {
      if (rightArrow.current) rightArrow.current!.classList.remove(styles.hidden);
      if (tournamentList.current) tournamentList.current!.classList.add(styles.fadeBottom);
    }

    // if screen is too large (max-width: 1024px), don't do anything more
    if (window.innerWidth > 1024) return;

    let closestChild = findClosestChildren(tournamentList.current!, tournamentListRect);
    const tournamentListChildren = tournamentList.current!.children;

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

  const selectTournament = (i: number, changeLastFading = true) => {
    if (i === selectedTournamentIndex) return;
    setSelectedTournamentIndex(i);
    if (changeLastFading) setLastFading(Date.now());
  };

  const scrollInTournamentList = (isScrollLeftOrTop: boolean) => {
    if (!tournamentList.current) return;
    const scrollAmount = 350;
    if (window.innerWidth > 1024) {
      tournamentList.current!.scrollBy({ top: isScrollLeftOrTop ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    } else {
      // scroll to the next tournament
      const tournamentListChildren = tournamentList.current!.children;
      const tournamentListRect = tournamentList.current!.getBoundingClientRect();

      const closestChild = findClosestChildren(tournamentList.current!, tournamentListRect);

      const tournamentId = closestChild.getAttribute('data-index');
      if (tournamentId) {
        const nextTournament = tournamentListChildren[parseInt(tournamentId) + (isScrollLeftOrTop ? -1 : 1)];

        // Scroll to center of the next tournament
        tournamentList.current!.scrollTo({
          left:
            nextTournament.getBoundingClientRect().left -
            tournamentListRect.left +
            tournamentList.current!.scrollLeft -
            tournamentListRect.width / 2 +
            nextTournament.getBoundingClientRect().width / 2,
          behavior: 'smooth',
        });
      }
    }
  };

  if (!tournaments) return null;

  // Initialize the selected tournament
  if (tournaments && tournaments.length !== 0 && selectedTournamentIndex === -1) {
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

  const renderedTournament = tournaments![renderedTournamentIndex];

  // If the tournament changed
  const fading = Date.now() - lastFading < fadeDuration;
  if (!fading && renderedTournamentIndex !== selectedTournamentIndex) {
    setRenderedTournamentIndex(selectedTournamentIndex);
    document.documentElement.style.setProperty(
      '--background-image',
      `url("${getTournamentBackgroundLink(tournaments![selectedTournamentIndex].id)}")`,
    );
  }

  // Initialization is not finished yet, so we just show the black screen
  if (renderedTournamentIndex === -1) {
    return (
      <TournamentSwitcherAnimation nextPage={undefined}>
        <div className={`${styles.tournamentContainer} ${fading ? styles.fading : ''}`} ref={root} />
      </TournamentSwitcherAnimation>
    );
  }

  return (
    <TournamentSwitcherAnimation nextPage={!nextUrl ? undefined : nextUrl}>
      <div className={`${styles.tournamentContainer} ${fading ? styles.fading : ''}`} ref={root}>
        <div className={styles.pageTitle}>
          <Divider white className={styles.divider} />
          <Title align="center" className={styles.title}>
            Tournois
          </Title>
          <Divider white className={styles.divider} />
        </div>
        <div className={styles.content}>
          <div className={styles.tournamentScrollContainer}>
            <div className={`${styles.arrow} ${styles.hidden}`} ref={leftArrow}>
              <Button className={styles.button} onClick={() => scrollInTournamentList(true)}>
                <Icon name={IconName.ChevronUp} fill={true} />
              </Button>
            </div>
            <div className={styles.arrow} ref={rightArrow}>
              <Button className={styles.button} onClick={() => scrollInTournamentList(false)}>
                <Icon name={IconName.ChevronBottom} fill={true} />
              </Button>
            </div>
            <div
              className={`${styles.tournamentsList} ${styles.fadeBottom}`}
              ref={tournamentList}
              onScroll={onTournamentListScroll}>
              {!tournaments
                ? 'Chargement des tournois...'
                : tournaments.map((tournament, i) => (
                    <img
                      key={tournament.id}
                      src={getTournamentImageLink(tournament.id)!}
                      alt={`Logo ${tournament.name}`}
                      data-index={i}
                      className={`${styles.tournament} ${i === selectedTournamentIndex ? styles.selected : ''}`}
                      onClick={() => selectTournament(i)}
                    />
                  ))}
            </div>
          </div>
          <div className={`${styles.tournamentInfo} ${fading ? styles.fading : ''}`}>
            <h2>{renderedTournament.name}</h2>
            <p>
              {renderedTournament.cashprize !== null &&
                (renderedTournament.cashprize === 0 ? (
                  <>
                    <strong>Cashprize sous forme de lots</strong> ·{' '}
                  </>
                ) : (
                  <>
                    <strong>{renderedTournament.cashprize}€</strong> de cashprize ·{' '}
                  </>
                ))}
              <strong>
                {renderedTournament.maxPlayers / renderedTournament.playersPerTeam}{' '}
                {renderedTournament.playersPerTeam === 1 ? 'joueurs' : 'équipes'}{' '}
              </strong>
              <br />
            </p>
            <p>
              {renderedTournament.casters !== null && renderedTournament.casters.length > 0 && (
                <>
                  Casté par <strong>{renderedTournament.casters?.map((caster) => caster.name + ' ')}</strong>
                </>
              )}
            </p>
            <Link href={``} scroll={false}>
              <Button className={styles.button} primary outline onClick={() => setNextUrl(renderedTournament.id)}>
                Plus d'infos
              </Button>
            </Link>
            <Button
              className={styles.button}
              primary
              onClick={() => {
                if (login) {
                  dispatch(setRedirect('/dashboard') as unknown as Action);
                  return;
                }
                dispatch(setLoginModalVisible(true) as unknown as Action);
              }}>
              {login ? 'Dashboard' : 'Se connecter'}
            </Button>
          </div>
        </div>
      </div>
    </TournamentSwitcherAnimation>
  );
}
