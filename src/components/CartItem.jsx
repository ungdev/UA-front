import { Button } from './UI';

const CartItem = ({ itemName, quantity, unitPrice, reducedUnitPrice = null, onRemove }) => {
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

export default CartItem;
