import { useState } from 'react';
import { Modal, Button, Checkbox, Input, FileInput } from '../UI';
import { useAppDispatch } from '@/lib/hooks';
import { AdminPartner } from '@/types';
import type { Action } from '@reduxjs/toolkit';
import { getPartnerLogoLink } from '@/utils/uploadLink';
import { addPartner, deletePartner, updatePartner } from '@/modules/admin';

const PartnerModal = ({ partner, onClose = undefined }: { partner: AdminPartner | null; onClose?: () => void }) => {
  const dispatch = useAppDispatch();
  const id = partner?.id || null;
  const [link, setLink] = useState(partner?.link || null);
  const [name, setName] = useState(partner?.name || null);
  const [logo, setLogo] = useState<File | null>(null);
  const [display, setDisplay] = useState(partner?.display || false);

  return (
    <Modal
      visible={true}
      title="Partenaire"
      onCancel={onClose ? onClose : () => {}}
      buttons={
        <>
          {id && (
            <Button
              primary
              outline
              onClick={() => {
                dispatch(deletePartner(id) as unknown as Action);
              }}>
                Supprimer
              </Button>
          )}

          <Button
            primary
            onClick={() => {
              const body = {
                id: id ?? '',
                name: name ?? '',
                link: link ?? '',
                display,
              };
              dispatch(
                partner == null
                  ? (addPartner(body, logo) as unknown as Action)
                  : (updatePartner(body, logo) as unknown as Action),
              );
            }}>
            Enregistrer
          </Button>
        </>
      }
      containerClassName="user-modal">
      <>
        <Input label="Nom" value={name ?? ''} onChange={setName} />
        <Input label="Lien" value={link ?? ''} onChange={setLink} />
        <FileInput label="Logo" value={partner ? getPartnerLogoLink(partner.id) : ''} onChange={setLogo} type="png" />
        <Checkbox label="Display" value={display} onChange={setDisplay} />
      </>
    </Modal>
  );
};

export default PartnerModal;
