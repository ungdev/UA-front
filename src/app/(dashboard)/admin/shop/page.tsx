'use client';
import { Button, DraggableList, Loader, Square, Title } from '@/components/UI';
import ItemModal from '@/components/dashboard/ItemModal';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { AdminItem } from '@/types';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { fetchAdminItems, reorderItems } from '@/modules/admin';

const Shop = () => {
  const shopItems = useAppSelector((state) => state.admin.items);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);
  const parentEl = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [items, setItems] = useState<JSX.Element[]>([]);
  const [didReorder, setDidReorder] = useState(false);
  const [reorderEnabled, setReorderEnabled] = useState(false);

  useEffect(() => {
    if (!shopItems) dispatch(fetchAdminItems());
  }, []);

  useEffect(() => {
    if (didReorder) return;
    setItems(
      shopItems?.map((item, index) => (
        <Square
          key={index}
          imgSrc={item.image ? '/images/' + item.image : undefined}
          alt={item.name}
          onClick={(e) => {
            if ((e!.target as ChildNode).parentElement?.parentElement?.classList.contains('dragging')) return;
            setSelectedItem(item);
          }}
          replacementText={!item.image ? item.name : null}
        />
      )) ?? [],
    );
  }, [shopItems]);

  return (
    <div className={styles.shop}>
      <div className={styles.titleContainer}>
        <Title level={2} gutterBottom={false}>
          Boutique
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
              // create a copy of the partners array
              const newItems = [...shopItems!];

              // loop through the newOrder array
              newOrder.forEach((newIndex, oldIndex) => {
                // update the partners array
                newItems[newIndex] = {
                  ...shopItems![oldIndex],
                  position: newIndex,
                };
              });

              // Avoid rerendering the list to avoid rebuilding the reorder component that may fail
              setDidReorder(true);

              // update the tournament in the store
              dispatch(reorderItems(newItems));
            }}
          />
        ) : (
          <Loader />
        )}
      </div>

      {selectedItem !== null && (
        <ItemModal
          item={selectedItem}
          onClose={() => {
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default Shop;
