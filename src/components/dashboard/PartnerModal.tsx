import { useState } from 'react';
import { Modal, Button, Checkbox, Input, FileInput, Textarea } from '@/components/UI';
import { useAppDispatch } from '@/lib/hooks';
import { AdminPartner } from '@/types';
import type { Action } from '@reduxjs/toolkit';
import { getPartnerLogoLink } from '@/utils/uploadLink';
import { addPartner, deletePartner, updatePartner } from '@/modules/admin';
import partners from '@/modules/partners';

/** The partner modal */
const PartnerModal = ({
  partner,
  onClose = undefined,
}: {
  /** The partner or null if you want to create a new one */
  partner: AdminPartner | null;
  /** The function to call when the user quits the modal */
  onClose?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const id = partner?.id || null;
  const [link, setLink] = useState(partner?.link || null);
  const [name, setName] = useState(partner?.name || null);
  const [logo, setLogo] = useState<File | null>(null);
  const [display, setDisplay] = useState(partner?.display || false);
  const [description, setDescription] = useState(partner?.description || null);

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
                dispatch(
                  deletePartner(id, () => {
                    onClose!();
                  }) as unknown as Action,
                );
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
                description: description ?? '',
                display,
              };
              dispatch(
                partner == null
                  ? (addPartner({ ...body, position: partners.length }, logo, () => {
                      onClose!();
                    }) as unknown as Action)
                  : // in this case position is not updated so we set it to -1
                    (updatePartner({ ...body, position: -1 }, logo, () => {
                      onClose!();
                    }) as unknown as Action),
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
        <Textarea label="Description" value={description ?? ''} onChange={setDescription} />
        <FileInput label="Logo" value={partner ? getPartnerLogoLink(partner.id) : ''} onChange={setLogo} type="png" />
        <Checkbox label="Display" value={display} onChange={setDisplay} />
      </>
    </Modal>
  );
};

export default PartnerModal;
