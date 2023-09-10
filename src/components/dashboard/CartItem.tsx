import { Button, Icon } from '../UI';
import { IconName } from '../UI/Icon';

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
    <div className="cart-item">
      <div className="item-name">{itemName}</div>
      <Button className="remove-btn" onClick={onRemove}>
        <Icon name={IconName.Trash} />
      </Button>
      <div>
        {quantity} x{' '}
        {reducedUnitPrice !== null ? (
          <>
            {(reducedUnitPrice / 100).toFixed(2)}€
            <span className="reducted-price">{(unitPrice / 100).toFixed(2)}€</span>
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
