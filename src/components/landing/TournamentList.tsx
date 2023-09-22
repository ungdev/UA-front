'use client';
import styles from './TournamentList.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { LegacyRef, useEffect, useRef } from 'react';
import { fetchTournaments } from '@/modules/tournament';
import { getTournamentImageLink } from '@/utils/uploadLink';
import { type Action } from '@reduxjs/toolkit';
import { Tournament } from '@/types';
import { Button, Icon, Title } from '@/components/UI';
import { IconName } from '@/components/UI/Icon';

const TIME_BETWEEN_CARDS = 5000;
const AUTOSLIDE = false;

/**
 * An infinite slider that displays tournament cards.
 * It works by rendering the set of tournament cards 3 times.
 * The set the user will mostly see is the middle one.
 * Each time the front-most card belongs to the first set, we scroll right by the length of a set : the front-most card will now belong to the second set.
 * Same with the third set, we scroll left by the length of a set so that the front-most card becomes a card from the second set.
 * If we scroll by exactly the length of a set, the operation will be seamless for the user, as the front-most card will stay the same, with only the set it belongs to being changed.
 *
 * This component may not be refresh-proof once it has rendered the first time.
 */
export default function TournamentList() {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournament.tournaments);
  /** The ref to the slider. */
  const cardsRef = useRef<HTMLDivElement>();

  /** Fetch the tournaments. */
  useEffect(() => {
    if (!tournaments) {
      dispatch(fetchTournaments() as unknown as Action);
    }
  }, []);

  /** Start auto-slider. */
  useEffect(() => {
    if (!AUTOSLIDE || !tournaments || !cardsRef.current) {
      return;
    }
    resetAutoSlideTimer();
  }, [tournaments, cardsRef.current]);

  /** Scroll to the first card of the second set at the beginning. */
  useEffect(() => {
    if (!cardsRef.current) return;
    scrollToCard(tournaments!.length);
  }, [cardsRef.current]);

  /**
   *  The id of the timeout that will auto-slide after TIME_BETWEEN_CARDS milliseconds.
   *  Every time there is a scroll event fired, the timeout is cancelled and then recreated, to ensure it doesn't fire when a user is scrolling.
   */
  let autoslideTimeout: number | undefined;
  /**
   * The number of requests that were made to ignore the scroll events.
   * This is useful when a smooth scroll is made, to avoid the scroll event callback to cancel it by re-centering the scroll bar.
   * Each time a smooth scroll is made, we add 1 to this value ; 200ms later, we remove 1 (that means we can now re-center the scroll bar).
   */
  let ignoreScrollRequests = 0;
  /**
   * The id of the timeout that will call the endScroll callback.
   * It works the same as the auto-slide : each time a scroll is detected, we cancel this timeout, and create a new one.
   */
  let endingScrollTimeout: number | undefined;

  /**
   * Returns the front-most card.
   */
  const findSelected = () => {
    let closestDistance = 10000;
    let closestIndex = 0;
    for (let i = 0; i < cardsRef.current!.children.length; i++) {
      const card = cardsRef.current!.children[i] as HTMLDivElement;
      const cardPosition = findHowCenteredCardIs(card);
      if (Math.abs(cardPosition) < closestDistance) {
        closestDistance = Math.abs(cardPosition);
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  /**
   * Returns how close the card is from the middle of the slider.
   * The closer it is, the bigger and opaque it will appear.
   * @param card The card we are considering, as a HTMLDivElement.
   */
  const findHowCenteredCardIs = (card: HTMLDivElement) => {
    const cardMiddle = card.offsetLeft + card.offsetWidth / 2;
    const cardsListMiddle = cardsRef.current!.offsetWidth / 2 + cardsRef.current!.scrollLeft;
    return Math.abs((cardMiddle - cardsListMiddle) / cardsRef.current!.offsetWidth);
  };

  /**
   * The function used to convert the return value of findHowCenteredCardIs to a value that represents how opaque/big the card will be.
   * This value is less or equal to 1 (it maxes out when x is 0, meaning the card is exactly at the middle of the slider).
   */
  const positionToVisibilityFunction = (x: number) => -3.2 * x * x - 0.4 * x + 1;

  /**
   * Scrolls horizontally to a certain x-position. If the scroll is smooth, we request to ignore scroll for 200ms.
   * @param position The position to scroll to. A position of 100 means that, from what we can see, the content of the container will have moved 100px to the left
   *                 (comparing to the position where the scrollbar is the most possible of the left, aka no scrolling).
   * @param smooth Whether the scroll should be smooth or instantaneous.
   */
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

  /**
   * Scrolls to make a certain card at the middle of the slider.
   * @param cardIndex The index of the card to place at the middle of the slider.
   *                  Warning : it's not necessarily the index of the tournament the card represents : there are 3 times more cards than tournaments.
   *                  However, this is true modulo tournaments.length : cardIndex % tournaments.length === tournamentIndex.
   * @param smooth Whether the scroll should be smooth or instantaneous.
   */
  const scrollToCard = (cardIndex: number, smooth: boolean = false) => {
    scrollTo(getScrollToCenterCard(cardIndex), smooth);
  };

  /**
   * Called when no scroll has happened in the last 200ms.
   * The main job of this function is to snap a card to the center.
   * The scroll is not done if we should scroll less than 1 pixel (otherwise we may get stuck forever doing micro-scrolls).
   * It also resets the auto-slider timeout.
   */
  const onScrollEnd = () => {
    const targetScroll = getScrollToCenterCard(findSelected());
    // Reset the auto slide timer
    if (AUTOSLIDE) resetAutoSlideTimer();
    // We don't care if we are 1 pixel off
    if (Math.abs(targetScroll - cardsRef.current!.scrollLeft) < 1) return;
    scrollTo(targetScroll, true);
  };

  /**
   * Returns the length, in pixels, of one of the 3 sets of cards.
   * Basically, scrolling forwards or backwards of this amounts will be seamless.
   */
  const getScrollLoopLength = () => {
    return tournaments!.length * (0.2 * cardsRef.current!.offsetWidth);
  };

  /**
   * Returns how much scroll is needed (the absolute value, NOT the scroll that we need to add to the current scroll)
   * for the card with index cardIndex to be centered in the slider.
   * @param cardIndex The index of the card (and not the tournament, see docs of scrollToCard for more information) to place at the center of the slider.
   */
  const getScrollToCenterCard = (cardIndex: number) => {
    const selectedCard = cardsRef.current!.children[cardIndex] as HTMLDivElement;
    return selectedCard.offsetLeft + selectedCard.offsetWidth / 2 - cardsRef.current!.offsetWidth / 2;
  };

  /**
   * Cancels the current auto-slide timeout and create a new one, that will be fired in TIME_BETWEEN_CARDS milliseconds.
   * If this method is called again before that time has ellapsed, again, it will be canceled,
   * and we will need wait another TIME_BETWEEN_CARDS milliseconds before an auto-slide is triggered.
   *
   * The auto-slide simply moves the slider by one card to the left (it slides to the right).
   */
  const resetAutoSlideTimer = () => {
    if (!AUTOSLIDE) return;
    if (typeof autoslideTimeout === 'number') {
      window.clearTimeout(autoslideTimeout);
    }
    autoslideTimeout = window.setTimeout(() => {
      scrollToCard(findSelected() + 1, true);
      autoslideTimeout = undefined;
    }, TIME_BETWEEN_CARDS);
  };

  /**
   * Callback called when a scroll is detected.
   * There is no difference between a real user scroll, and a scroll triggered in the code.
   *
   * These are the things it does :
   * 1) Update the visibility of each card
   * 2) Reset the timeout that triggers the onScrollEnd callback.
   * 3) Verify we are still mostly looking at the second set.
   * The last step is skipped if there are requests to ignore scroll (ignoreScrollRequests > 0).
   */
  const onScroll = () => {
    // Update the CSS variable "--visibility"
    for (let i = 0; i < cardsRef.current!.children.length; i++) {
      const card = cardsRef.current!.children[i] as HTMLDivElement;
      const cardPosition = findHowCenteredCardIs(card);
      const visibility = positionToVisibilityFunction(cardPosition);
      card.style.setProperty('--visibility', `${Math.max(0, visibility)}`);
    }
    // Snap to a card
    window.clearTimeout(endingScrollTimeout);
    endingScrollTimeout = window.setTimeout(onScrollEnd, 200);
    // Return if we asked for this scroll
    if (ignoreScrollRequests > 0) return;
    // Make sure the div isn't scrolled too much on the left or on the right
    if (cardsRef.current!.scrollLeft < getScrollToCenterCard(tournaments!.length - 1)) {
      scrollTo(cardsRef.current!.scrollLeft + getScrollLoopLength());
    } else if (cardsRef.current!.scrollLeft > getScrollToCenterCard(2 * tournaments!.length)) {
      scrollTo(cardsRef.current!.scrollLeft - getScrollLoopLength());
    }
  };

  /**
   * As long as we haven't received the tournaments we don't display anything.
   */
  if (!tournaments) {
    return false;
  }

  /**
   * Returns the HTML to create a card.
   * A card contains a cardPositionner container, and in it there is the "visual" card.
   * The "visual" card container will be absolutely positioned, to be able to overlap it with other ones.
   * @param tournament The tournament this class represents.
   * @param cardId The unique id of the card. It will go from -tournaments.length to 2 * tournaments.length - 1.
   *               It is not used for anything else than the key prop, it could be whatever you want.
   */
  const createCard = (tournament: Tournament, cardId: number) => {
    return (
      <div className={styles.cardPositionner} key={cardId}>
        <div
          className={styles.card}
          style={
            {
              '--background': `url(${getTournamentImageLink('csgo' /*tournament.id*/)})`,
            } as React.CSSProperties
          }>
          <Title level={4} type={3} className={styles.tournamentName}>
            {tournament.name}
          </Title>
          <a href={`/tournaments/${tournament.id}`}>
            <Button primary>Plus d'infos</Button>
          </a>
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
