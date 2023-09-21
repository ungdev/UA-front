'use client';
import styles from './TournamentList.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { fetchTournaments } from '@/modules/tournament';
import { getTournamentImageLink } from '@/utils/uploadLink';
import { type Action } from '@reduxjs/toolkit';
import { Tournament } from '@/types';
import { Button, Icon, Title } from '@/components/UI';
import { IconName } from '@/components/UI/Icon';

const TIME_BETWEEN_CARDS = 5000;
const AUTOSLIDE = false;

export default function TournamentList() {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournament.tournaments);
  const cardsRef = useRef<HTMLDivElement>();

  let autoslideTimeout: number | undefined = undefined;

  const findSelected = () => {
    let closestDistance = 10000;
    let closestIndex = 0;
    for (let i = 0; i < cardsRef.current!.children.length; i++) {
      const card = cardsRef.current!.children[i] as HTMLDivElement;
      const cardMiddle = card.offsetLeft + cardsRef.current!.offsetWidth * 0.25;
      const cardsListMiddle = cardsRef.current!.offsetWidth / 2 + cardsRef.current!.scrollLeft;
      const cardPosition = (cardMiddle - cardsListMiddle) / cardsRef.current!.offsetWidth;
      if (Math.abs(cardPosition) < closestDistance) {
        closestDistance = Math.abs(cardPosition);
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  const findHowCenteredCardIs = (card: HTMLDivElement) => {
    const cardMiddle = card.offsetLeft + cardsRef.current!.offsetWidth * 0.25;
    const cardsListMiddle = cardsRef.current!.offsetWidth / 2 + cardsRef.current!.scrollLeft;
    return Math.abs((cardMiddle - cardsListMiddle) / cardsRef.current!.offsetWidth);
  };

  const positionToVisibilityFunction = (x: number) => -3.2 * x * x - 0.4 * x + 1;

  let ignoreScrollRequests = 0;
  let endingScrollTimeout: number | undefined;
  const onScroll = () => {
    // Reset the auto slide timer
    if (AUTOSLIDE) resetAutoSlideTimer();
    // Update CSS
    for (let i = 0; i < cardsRef.current!.children.length; i++) {
      const card = cardsRef.current!.children[i] as HTMLDivElement;
      const cardPosition = findHowCenteredCardIs(card);
      const visibility = positionToVisibilityFunction(cardPosition);
      card.style.setProperty('--visibility', `${Math.max(0, visibility)}`);
    }
    console.log(ignoreScrollRequests);
    // Snap to a card
    window.clearTimeout(endingScrollTimeout);
    endingScrollTimeout = window.setTimeout(onScrollEnd, 1000);
    // Return if we asked for this scroll
    if (ignoreScrollRequests > 0) return;
    // Make sure the div isn't scrolled too much on the left or on the right
    if (cardsRef.current!.scrollLeft < getScrollToCenterCard(tournaments!.length - 1)) {
      scrollTo(cardsRef.current!.scrollLeft + getScrollLoopLength());
    } else if (cardsRef.current!.scrollLeft > getScrollToCenterCard(2 * tournaments!.length)) {
      scrollTo(cardsRef.current!.scrollLeft - getScrollLoopLength());
    }
  };

  const scrollTo = (position: number, smooth: boolean = false) => {
    if (smooth) {
      ignoreScrollRequests++;
      setTimeout(() => {
        ignoreScrollRequests--;
        onScroll();
      }, 200);
    }
    cardsRef.current!.scroll({ left: position, behavior: smooth ? 'smooth' : 'instant' });
  };

  const scrollToCard = (cardIndex: number, smooth: boolean = false) => {
    scrollTo(getScrollToCenterCard(cardIndex), smooth);
  };

  const onScrollEnd = () => {
    const targetScroll = getScrollToCenterCard(findSelected());
    // We don't care if we are 1 pixel off
    if (targetScroll - cardsRef.current!.scrollLeft < 1) return;
    scrollTo(targetScroll, true);
  };

  /**
   * Returns the length, in pixels, of one of each card of the tournaments list.
   * Basically, scrolling forwards or backwards of this amounts will be seamless.
   */
  const getScrollLoopLength = () => {
    return tournaments!.length * (0.25 * cardsRef.current!.offsetWidth);
  };

  const getScrollToCenterCard = (cardIndex: number) => {
    const selectedCard = cardsRef.current!.children[cardIndex] as HTMLDivElement;
    return selectedCard.offsetLeft - cardsRef.current!.offsetWidth / 2 + (0.2 * window.innerWidth) / 2;
  };

  const resetAutoSlideTimer = () => {
    window.clearTimeout(autoslideTimeout);
    autoslideTimeout = window.setTimeout(() => scrollToCard(findSelected() + 1, true), TIME_BETWEEN_CARDS);
  };

  useEffect(() => {
    if (!tournaments) {
      dispatch(fetchTournaments() as unknown as Action);
    }
  }, []);

  useEffect(() => {
    if (!AUTOSLIDE || !tournaments) {
      return;
    }
    resetAutoSlideTimer();
  }, [tournaments]);

  useEffect(() => {
    if (!cardsRef.current) return;
    scrollTo(getScrollToCenterCard(tournaments!.length));
  }, [cardsRef.current]);

  if (!tournaments) {
    return false;
  }

  const createCard = (tournament: Tournament, tournamentIndex: number) => {
    return (
      <div className={`${styles.cardPositionner}`}>
        <div
          className={`${styles.card}`}
          key={tournamentIndex}
          style={
            {
              '--background': `url(${getTournamentImageLink(/*tournament.id*/ 'csgo')})`,
            } as React.CSSProperties
          }>
          <Title level={4} type={3} className={styles.tournamentName}>
            {tournament.name}
          </Title>
          <Button primary>Plus d'infos</Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.tournamentList}>
      <Icon
        name={IconName.ChevronLeft}
        className={styles.arrow}
        onClick={() => scrollToCard(findSelected() - 1, true)}
      />
      <div className={styles.cards} ref={cardsRef as LegacyRef<HTMLDivElement>} onScroll={onScroll}>
        {tournaments.map((tournament, i) => createCard(tournament, i - tournaments.length))}
        {tournaments.map((tournament, i) => createCard(tournament, i))}
        {tournaments.map((tournament, i) => createCard(tournament, i + tournaments.length))}
      </div>
      <Icon
        name={IconName.ChevronRight}
        className={styles.arrow}
        onClick={() => scrollToCard(findSelected() + 1, true)}
      />
    </div>
  );
}
