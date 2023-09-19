'use client';
import styles from './TournamentList.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';
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
  const [selected, setSelected] = useState(1);
  const [changingTimeout, setChangingTimeout] = useState<number>();

  useEffect(() => {
    if (!tournaments) {
      dispatch(fetchTournaments() as unknown as Action);
    }
  }, []);

  useEffect(() => {
    if (!AUTOSLIDE) {
      return;
    }
    if (!tournaments) {
      return;
    }
    if (changingTimeout) {
      window.clearTimeout(changingTimeout);
    }
    const timeout = window.setTimeout(() => setSelected((selected + 1) % tournaments.length), TIME_BETWEEN_CARDS);
    setChangingTimeout(timeout);
  }, [selected, tournaments]);

  if (!tournaments) {
    return false;
  }

  const createCard = (tournament: Tournament, tournamentIndex: number) => {
    let className: string;
    if (tournamentIndex === selected) className = styles.selected;
    else if (tournamentIndex === selected - 1) className = `${styles.neighbour} ${styles.visibleLeft}`;
    else if (tournamentIndex === selected + 1) className = `${styles.neighbour} ${styles.visibleRight}`;
    else if (tournamentIndex < selected) className = `${styles.hidden} ${styles.hiddenLeft}`;
    else className = `${styles.hidden} ${styles.hiddenRight}`;
    return (
      <div
        className={`${styles.card} ${className}`}
        key={tournamentIndex}
        style={{ '--background': `url(${getTournamentImageLink(/*tournament.id*/'csgo')})` } as React.CSSProperties}>
        <Title level={4} type={3} className={styles.tournamentName}>
          {tournament.name}
        </Title>
        <Button primary>Plus d'infos</Button>
      </div>
    );
  };

  return (
    <div className={styles.tournamentList}>
      <Icon
        name={IconName.ChevronLeft}
        className={`${styles.arrow} ${selected === 0 ? styles.disabled : ''}`}
        onClick={() => selected !== 0 && setSelected(selected - 1)}
      />
      <div className={styles.cards}>{tournaments.map((tournament, i) => createCard(tournament, i))}</div>
      <Icon
        name={IconName.ChevronRight}
        className={`${styles.arrow} ${selected === tournaments.length - 1 ? styles.disabled : ''}`}
        onClick={() => selected !== tournaments.length - 1 && setSelected(selected + 1)}
      />
    </div>
  );
}
