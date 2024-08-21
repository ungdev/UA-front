'use client';
import { Button, DraggableList, Loader, Square, Title } from '@/components/UI';
import TournamentModal from '@/components/dashboard/TournamentModal';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { AdminTournament } from '@/types';
import { getTournamentImageLink } from '@/utils/uploadLink';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { fetchAdminTournaments, reorderTournaments } from '@/modules/admin';

const Tournaments = () => {
  const tournaments = useAppSelector((state) => state.admin.tournaments);
  const [selectedTournament, setSelectedTournament] = useState<AdminTournament | null>(null);
  const [createNewTournament, setCreateNewTournament] = useState(false);
  const parentEl = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [items, setItems] = useState<JSX.Element[]>([]);
  const [didReorder, setDidReorder] = useState(false);
  const [reorderEnabled, setReorderEnabled] = useState(false);

  useEffect(() => {
    if (!tournaments) dispatch(fetchAdminTournaments());
  }, []);

  useEffect(() => {
    if (didReorder) return;
    setItems(
      tournaments?.map((tournament, index) => (
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
      <div className={styles.titleContainer}>
        <Title level={2} gutterBottom={false}>
          Tournois
        </Title>
        <Button primary outline onClick={() => setReorderEnabled((prev) => !prev)}>
          {reorderEnabled ? 'Terminer' : 'Réorganiser'}
        </Button>
      </div>

      <div className={styles.squareContainer} ref={parentEl}>
        {items.length !== 0 ? (
          <DraggableList
            items={items}
            availableWidth={parentEl.current?.clientWidth ?? 0}
            blockHeight={300}
            blockWidth={300}
            blockGap={12}
            enabled={reorderEnabled}
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

              // Avoid rerendering the list to avoid rebuilding the reorder component that may fail
              setDidReorder(true);

              // update the tournament in the store
              dispatch(reorderTournaments(newTournaments));
            }}
          />
        ) : (
          <Loader />
        )}
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
