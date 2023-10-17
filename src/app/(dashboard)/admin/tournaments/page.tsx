'use client';
import { Square, Title } from '@/components/UI';
import TournamentModal from '@/components/dashboard/TournamentModal';
import { useAppSelector } from '@/lib/hooks';
import { AdminTournament } from '@/types';
import { getTournamentImageLink } from '@/utils/uploadLink';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
// import { reorderTournaments } from '@/modules/admin';
// import type { Action } from '@reduxjs/toolkit';

const Tournaments = () => {
  const tournaments = useAppSelector((state) => state.admin.tournaments);
  const [selectedTournament, setSelectedTournament] = useState<AdminTournament | null>(null);
  const [createNewTournament, setCreateNewTournament] = useState(false);
  const parentEl = useRef<HTMLDivElement>(null);
  // const dispatch = useAppDispatch();

  const [items, setItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setItems(
      tournaments
        ?.toSorted((a: AdminTournament, b: AdminTournament) => a.position - b.position)
        .map((tournament, index) => (
          <Square
            key={index}
            imgSrc={getTournamentImageLink(tournament.id)}
            alt={tournament.name}
            onClick={(e) => {
              if ((e!.target as ChildNode).parentElement?.parentElement?.classList.contains('dragging')) return;
              setSelectedTournament(tournament);
            }}
          />
        )) ?? [],
    );
  }, [tournaments]);

  return (
    <div className={styles.tournaments}>
      <Title>Tournois</Title>

      <div className={styles.squareContainer} ref={parentEl}>
        {items}
        {/* <DraggableList
          items={
            items
          }
          availableWidth={parentEl.current?.clientWidth ?? 0}
          blockHeight={300}
          blockWidth={300}
          blockGap={8}
          onReorder={(newOrder) => {
            // create a copy of the tournaments array
            const newTournaments = [...tournaments!];

            // loop through the newOrder array
            newOrder.forEach((newIndex, oldIndex) => {
              // update the tournaments array
              newTournaments[newIndex] = {
                ...tournaments![oldIndex],
                position: newIndex,
              };
            });

            // update the tournament in the store
            dispatch(reorderTournaments(newTournaments) as unknown as Action);

            setTimeout(() => {
              // refresh the page
              window.location.reload();
            }, 200);
          }}
        /> */}
      </div>

      {(selectedTournament !== null || createNewTournament) && (
        <TournamentModal
          tournament={selectedTournament}
          onClose={() => {
            setSelectedTournament(null);
            setCreateNewTournament(false);
          }}
        />
      )}
    </div>
  );
};

export default Tournaments;
