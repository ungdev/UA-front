'use client';
import { DraggableList, Square, Title } from '@/components/UI';
import TournamentModal from '@/components/dashboard/TournamentModal';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { AdminTournament } from '@/types';
import { getTournamentImageLink } from '@/utils/uploadLink';
import { useRef, useState } from 'react';
import styles from './style.module.scss';
import { reorderTournaments } from '@/modules/admin';
import { Action } from '@reduxjs/toolkit';

const Tournaments = () => {
  const tournaments = useAppSelector((state) => state.admin.tournaments);
  const [selectedTournament, setSelectedTournament] = useState<AdminTournament | null>(null);
  const [createNewTournament, setCreateNewTournament] = useState(false);
  const parentEl = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.tournaments}>
      <Title>Tournois</Title>

      <div className={styles.squareContainer} ref={parentEl}>
        <DraggableList
          items={tournaments?.map((tournament, index) => (
            <Square
              key={index}
              imgSrc={getTournamentImageLink(tournament.id)}
              alt={tournament.name}
              onClick={(e) => {
                if((e!.target as ChildNode).parentElement?.parentElement?.classList.contains('dragging')) return;
                setSelectedTournament(tournament);
              }}
            />
          )) ?? []} 
          availableWidth={parentEl.current?.clientWidth ?? 0}
          blockHeight={300}
          blockWidth={300}
          blockGap={8}
          onReorder={(newOrder) => {
            // newOrder is an array of indexes of the new order eg: [1, 0, 2, 3]
            // we need to update the tournaments array

            // create a copy of the tournaments array
            const newTournaments = [...tournaments!];

            // loop through the newOrder array
            newOrder.forEach((newIndex, oldIndex) => {
              // get the tournament at the old index
              const tournament = tournaments![oldIndex];

              // update the tournament's position
              // tournament.position = newIndex;

              // update the tournaments array
              newTournaments[newIndex] = tournament;
            });

            // update the tournament in the store
            dispatch(reorderTournaments(newTournaments) as unknown as Action);
          }}
        />
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
