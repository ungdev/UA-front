'use client';
import { Square, Title } from '@/components/UI';
import ItemModal from '@/components/dashboard/ItemModal';
import { useAppSelector } from '@/lib/hooks';
import { AdminItem } from '@/types';
import { useState } from 'react';
import styles from './style.module.scss';

const Shop = () => {
  const items = useAppSelector((state) => state.admin.items);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);

  return (
    <div className={styles.partners}>
      <div className={styles.titleContainer}>
        <Title level={2}>Boutique (Fonctionnalité en cours de création)</Title>
      </div>

      <div className={styles.squareContainer}>
        {items?.map((item, index) => (
          <Square
            key={index}
            imgSrc={item.image ? '/images/' + item.image : undefined}
            alt={item.name}
            onClick={() => setSelectedItem(item)}
            replacementText={!item.image ? item.name : null}
          />
        ))}
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
