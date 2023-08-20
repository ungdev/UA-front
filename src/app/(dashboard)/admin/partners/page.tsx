'use client';
import { Button, Card } from '@/components/UI';
import PartnerModal from '@/components/dashboard/PartnerModal';
import { useAppSelector } from '@/lib/hooks';
import { AdminPartner } from '@/types';
import { getPartnerLogoLink } from '@/utils/uploadLink';
import { useState } from 'react';

const Partners = () => {
  const partners = useAppSelector((state) => state.admin.partners);
  const [selectedPartner, setSelectedPartner] = useState<AdminPartner | null>(null);
  const [createNewPartner, setCreateNewPartner] = useState(false);

  return (
    <>
      <Button primary onClick={() => setCreateNewPartner(true)}>
        Ajouter un partenaire
      </Button>

      {partners?.map((partner, index) => (
        <div key={index} onClick={() => setSelectedPartner(partner)}>
          <Card>
            <img src={getPartnerLogoLink(partner.id)} alt={partner.name} />
          </Card>
        </div>
      ))}

      {(selectedPartner !== null || createNewPartner) && (
        <PartnerModal
          partner={selectedPartner}
          onClose={() => {
            setSelectedPartner(null);
            setCreateNewPartner(false);
          }}
        />
      )}
    </>
  );
};

export default Partners;
