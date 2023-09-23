import styles from './CartItem.module.scss';
import { Button, Icon } from '@/components/UI';
import { IconName } from '@/components/UI/Icon';

/** The cart item */
const CartItem = ({
  itemName,
  quantity,
  unitPrice,
  reducedUnitPrice = null,
  onRemove,
}: {
  /** The item name */
  itemName: string;
  /** The quantity */
  quantity: number;
  /** The unit price */
  unitPrice: number;
  /** The reduced unit price */
  reducedUnitPrice?: number | null;
  /** The function to call when the item is removed */
  onRemove: () => void;
}) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemName}>{itemName}</div>
      <Button onClick={onRemove}>
        <Icon name={IconName.Trash} />
      </Button>
      <div>
        {quantity} x{' '}
        {reducedUnitPrice !== null ? (
          <>
            {(reducedUnitPrice / 100).toFixed(2)}€
            <span className={styles.reductedPrice}>{(unitPrice / 100).toFixed(2)}€</span>
          </>
        ) : (
          <>{(unitPrice / 100).toFixed(2)}€</>
        )}
      </div>
      <div>{((quantity * (reducedUnitPrice || unitPrice)) / 100).toFixed(2)}€</div>
    </div>
  );
};

export default CartItem;
