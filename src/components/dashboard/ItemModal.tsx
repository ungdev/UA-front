import { useState } from 'react';
import { Modal, Button, Input, Textarea, Checkbox, Select } from '@/components/UI';
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
  const [quantity, setQuantity] = useState(item?.stock || null);
  const [infos, setInfos] = useState(item?.infos || null);
  const [display, setDisplay] = useState(item?.display || false);

  const [attribute, setAttribute] = useState(item?.attribute || null);
  const [category, setCategory] = useState(item?.category || null);

  const categories = [
    ['rent', 'Location'],
    ['supplement', 'Supplément'],
    ['ticket', 'Ticket'],
  ];

  const convertToDateTimeLocalString = (date: Date) => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

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
                category: category ?? '',
                attribute: attribute ?? '',
                price: price ?? 0,
                reducedPrice: reducedPrice ?? 0,
                availableFrom: startDate ?? '',
                availableUntil: endDate ?? '',
                // we update the stock through a difference between the current stock and the quantity in order to avoid conflicts if an order is made at the same time
                left: quantity! - item!.stock! ?? item!.stock!,
                infos: infos ?? '',
                display,
              } as AdminItem;

              if (attribute === '') {
                delete body.attribute;
              }

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
        <Select
          label="Catégorie"
          options={categories.map((category) => ({
            value: category[0],
            label: category[1],
          }))}
          value={category as string}
          onChange={setCategory}
        />
        <Input label="Attribut" value={attribute ?? ''} onChange={setAttribute} />
        <Input
          label="Date de début"
          type="datetime-local"
          value={startDate ? convertToDateTimeLocalString(startDate) : ''}
          onChange={(value) => {
            setStartDate(new Date(value as unknown as number));
          }}
        />
        <Input
          label="Date de fin"
          type="datetime-local"
          value={endDate ? convertToDateTimeLocalString(endDate) : ''}
          onChange={(value) => {
            setEndDate(new Date(value as unknown as number));
          }}
        />
        <Input
          label="Stock restant"
          value={quantity ?? ''}
          onChange={(value) => setQuantity(value as unknown as number)}
        />
        <Textarea label="Description" value={infos ?? ''} onChange={setInfos} />
        <Checkbox label="Display" value={display} onChange={setDisplay} />
      </>
    </Modal>
  );
};

export default ItemModal;
