'use client';
import { Button, DraggableList, Loader, Square, Title } from '@/components/UI';
import PartnerModal from '@/components/dashboard/PartnerModal';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { AdminPartner } from '@/types';
import { getPartnerLogoLink } from '@/utils/uploadLink';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { type Action } from '@reduxjs/toolkit';
import { fetchAdminPartners, reorderPartners } from '@/modules/admin';

const Partners = () => {
  const partners = useAppSelector((state) => state.admin.partners);
  const [selectedPartner, setSelectedPartner] = useState<AdminPartner | null>(null);
  const [createNewPartner, setCreateNewPartner] = useState(false);
  const parentEl = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [items, setItems] = useState<JSX.Element[]>([]);
  const [didReorder, setDidReorder] = useState(false);
  const [reorderEnabled, setReorderEnabled] = useState(false);

  useEffect(() => {
    if (!partners) dispatch(fetchAdminPartners() as unknown as Action);
  }, []);

  useEffect(() => {
    if (didReorder) return;
    setItems(
      partners?.map((partner, index) => (
        <Square
          key={index}
          imgSrc={getPartnerLogoLink(partner.id)}
          alt={partner.name}
          onClick={(e) => {
            if ((e!.target as ChildNode).parentElement?.parentElement?.classList.contains('dragging')) return;
            setSelectedPartner(partner);
          }}
        />
      )) ?? [],
    );
  }, [partners]);

  return (
    <div className={styles.partners}>
      <div className={styles.titleContainer}>
        <Title level={2} gutterBottom={false}>
          Partenaires
        </Title>
        <div>
          <Button primary outline onClick={() => setReorderEnabled((prev) => !prev)}>
            {reorderEnabled ? 'Terminer' : 'Réorganiser'}
          </Button>
          <Button primary onClick={() => setCreateNewPartner(true)}>
            Ajouter un partenaire
          </Button>
        </div>
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
              // create a copy of the partners array
              const newPartners = [...partners!];

              // loop through the newOrder array
              newOrder.forEach((newIndex, oldIndex) => {
                // update the partners array
                newPartners[newIndex] = {
                  ...partners![oldIndex],
                  position: newIndex,
                };
              });

              // Avoid rerendering the list to avoid rebuilding the reorder component that may fail
              setDidReorder(true);

              // update the tournament in the store
              dispatch(reorderPartners(newPartners) as unknown as Action);
            }}
          />
        ) : (
          'Aucun partenaire pour le moment'
        )}
      </div>

      {(selectedPartner !== null || createNewPartner) && (
        <PartnerModal
          partner={selectedPartner}
          onClose={() => {
            setSelectedPartner(null);
            setCreateNewPartner(false);
          }}
        />
      )}
    </div>
  );
};

export default Partners;
