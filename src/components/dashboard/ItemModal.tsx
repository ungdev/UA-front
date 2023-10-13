import { useState } from 'react';
import { Modal, Button, Input, Textarea } from '@/components/UI';
import { useAppDispatch } from '@/lib/hooks';
import { AdminItem } from '@/types';
import type { Action } from '@reduxjs/toolkit';
import { updateItem } from '@/modules/admin';

/** The partner modal */
const ItemModal = ({
  item,
  onClose = undefined,
}: {
  /** The item or null if you want to create a new one */
  item: AdminItem | null;
  /** The function to call when the user quits the modal */
  onClose?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const id = item?.id || null;
  const [name, setName] = useState(item?.name || null);
  const [price, setPrice] = useState(item?.price || null);
  const [reducedPrice, setReducedPrice] = useState(item?.reducedPrice || null);
  const [startDate, setStartDate] = useState(item?.availableFrom || null);
  const [endDate, setEndDate] = useState(item?.availableUntil || null);
  const [quantity, setQuantity] = useState(item?.left || null);
  const [infos, setInfos] = useState(item?.infos || null);

  return (
    <Modal
      visible={true}
      title="Shop Item"
      onCancel={onClose ? onClose : () => {}}
      buttons={
        <>
          <Button
            primary
            onClick={() => {
              const body = {
                id: id ?? '',
                name: name ?? '',
                price: price ?? 0,
                reducedPrice: reducedPrice ?? 0,
                availableFrom: startDate ?? '',
                availableUntil: endDate ?? '',
                left: quantity ?? 0,
                infos: infos ?? '',
              } as AdminItem;
              dispatch(
                updateItem(body, () => {
                  onClose!();
                }) as unknown as Action,
              );
            }}>
            Enregistrer
          </Button>
        </>
      }
      containerClassName="user-modal">
      <>
        <Input label="Nom" value={name ?? ''} onChange={setName} />
        <Input label="Prix" value={price ?? ''} onChange={(value) => setPrice(value as unknown as number)} />
        <Input
          label="Prix réduit"
          value={reducedPrice ?? ''}
          onChange={(value) => setReducedPrice(value as unknown as number)}
        />
        <Input
          label="Date de début"
          type="datetime-local"
          value={startDate ?? ''}
          onChange={(value) => setStartDate(value as unknown as number)}
        />
        <Input
          label="Date de fin"
          type="datetime-local"
          value={endDate ?? ''}
          onChange={(value) => setEndDate(value as unknown as number)}
        />
        <Input
          label="Stock restant"
          value={quantity ?? ''}
          onChange={(value) => setQuantity(value as unknown as number)}
        />
        <Textarea label="Description" value={infos ?? ''} onChange={setInfos} />
      </>
    </Modal>
  );
};

export default ItemModal;
