import PropTypes from 'prop-types';

import { Button } from './UI';

const CartItem = ({ itemName, quantity, unitPrice, reducedUnitPrice, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="item-name">{itemName}</div>
      <Button className="remove-btn" onClick={onRemove} rightIcon="fas fa-trash-alt red-icon" noStyle />
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

CartItem.propTypes = {
  /**
   * The name of the item as it should be displayed
   */
  itemName: PropTypes.string.isRequired,
  /**
   * The quantity of the item in the cart
   */
  quantity: PropTypes.number.isRequired,
  /**
   * The unit price of the item
   */
  unitPrice: PropTypes.number.isRequired,
  /**
   * The reduced price (for 1 product) that should be applied. If there is no reduction, it should be null
   */
  reducedUnitPrice: PropTypes.number,
  /**
   * A callback function called when the bin icon is clicked
   */
  onRemove: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  reducedUnitPrice: null,
};

export default CartItem;
