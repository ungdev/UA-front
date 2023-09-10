'use client';
import { Button, Square, Title } from '@/components/UI';
import PartnerModal from '@/components/dashboard/PartnerModal';
import { useAppSelector } from '@/lib/hooks';
import { AdminPartner } from '@/types';
import { getPartnerLogoLink } from '@/utils/uploadLink';
import { useState } from 'react';
import styles from './style.module.scss';

const Partners = () => {
  const partners = useAppSelector((state) => state.admin.partners);
  const [selectedPartner, setSelectedPartner] = useState<AdminPartner | null>(null);
  const [createNewPartner, setCreateNewPartner] = useState(false);

  return (
    <div className={styles.partners}>
      <div className={styles.titleContainer}>
        <Title>Partenaires</Title>
        <Button primary onClick={() => setCreateNewPartner(true)}>
          Ajouter un partenaire
        </Button>
      </div>
      

      <div className={styles.squareContainer}>
        {partners?.map((partner, index) => (
          <Square key={index} imgSrc={getPartnerLogoLink(partner.id)} alt={partner.name} onClick={() => setSelectedPartner(partner)} />
        ))}
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
