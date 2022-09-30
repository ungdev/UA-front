const CartItem = ({ itemName, quantity, unitPrice }) => {
  return (
    <div className="cart-item">
      <div className="item-name">{itemName}</div>
      <div>
        {quantity} x {(unitPrice / 100).toFixed(2)}€
      </div>
      <div>{((quantity * unitPrice) / 100).toFixed(2)}€</div>
    </div>
  );
};

export default CartItem;
