import CartItem from './CartItem';

const Cart = ({ cart, items }) => {
  return (
    <div className="cart">
      {cart.supplements.map((supplement) => {
        let item = items.find((item) => item.id == supplement.itemId);
        return <CartItem itemName={item.name} quantity={supplement.quantity} unitPrice={item.price} />;
      })}
    </div>
  );
};

export default Cart;
