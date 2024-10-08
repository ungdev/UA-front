import styles from './CartItem.module.scss';
import { Icon } from '@/components/UI';
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
  onRemove: (() => void) | null;
}) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.left}>
        <div className={styles.itemName}>{itemName}</div>
        <div>
          {quantity} x{' '}
          {reducedUnitPrice !== null ? (
            <>
              {(reducedUnitPrice / 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              €
              <span className={styles.reductedPrice}>
                {(unitPrice / 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                €
              </span>
            </>
          ) : (
            <>
              {(unitPrice / 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              €
            </>
          )}
        </div>
      </div>
      <div className={styles.right}>
        <div className="">
          {((quantity * (reducedUnitPrice || unitPrice)) / 100).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          €
        </div>
        {onRemove && <Icon name={IconName.Trash} onClick={onRemove} />}
      </div>
    </div>
  );
};

export default CartItem;
