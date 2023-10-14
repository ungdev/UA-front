'use client';
import { Button, DraggableList, Square, Title } from '@/components/UI';
import PartnerModal from '@/components/dashboard/PartnerModal';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { AdminPartner } from '@/types';
import { getPartnerLogoLink } from '@/utils/uploadLink';
import { useRef, useState } from 'react';
import styles from './style.module.scss';
import { Action } from '@reduxjs/toolkit';
import { reorderPartners } from '@/modules/admin';

const Partners = () => {
  const partners = useAppSelector((state) => state.admin.partners);
  const [selectedPartner, setSelectedPartner] = useState<AdminPartner | null>(null);
  const [createNewPartner, setCreateNewPartner] = useState(false);
  const parentEl = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.partners}>
      <div className={styles.titleContainer}>
        <Title level={2}>Partenaires</Title>
        <Button primary onClick={() => setCreateNewPartner(true)}>
          Ajouter un partenaire
        </Button>
      </div>

      <div className={styles.squareContainer} ref={parentEl}>
        <DraggableList
          items={partners?.map((partner, index) => (
            <Square
              key={index}
              imgSrc={getPartnerLogoLink(partner.id)}
              alt={partner.name}
              onClick={() => setSelectedPartner(partner)}
            />
          )) ?? []} 
          availableWidth={parentEl.current?.clientWidth ?? 0}
          blockHeight={300}
          blockWidth={300}
          blockGap={8}
          onReorder={(newOrder) => {
            // newOrder is an array of indexes of the new order eg: [1, 0, 2, 3]
            // we need to update the partners array

            // create a copy of the partners array
            const newPartners = [...partners!];

            // loop through the newOrder array
            newOrder.forEach((newIndex, oldIndex) => {
              // get the tournament at the old index
              const partner = newPartners![oldIndex];

              // update the tournament's position
              partner.position = newIndex;

              // update the tournaments array
              newPartners[newIndex] = partner;
            });

            // update the tournament in the store
            dispatch(reorderPartners(newPartners) as unknown as Action);
          }}
        />
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
