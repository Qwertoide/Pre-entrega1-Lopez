import { useCart } from '../../hooks/useCart';
import './CartItem.css';

const CartItem = ({id, name, quantity, price, compact = false }) => {
  const { removeItem } = useCart();

  const handleRemove = (id) => {
    removeItem(id);
  };

  return (
    <article
      className={`CardCartItem bg-body-tertiary ${compact ? 'CardCartItem-compact' : ''}`}
    >
      <header className={`HeaderCartItem ${compact ? 'HeaderCartItem-compact' : ''}`}>
        <h3 className={`ItemHeaderCartItem ${compact ? 'ItemHeaderCartItem-compact' : ''}`}>
          {name}
        </h3>
      </header>

      <section className={`ContainerItemCartItem ${compact ? 'ContainerItemCartItem-compact' : ''}`}>
        <p className={`ItemCartItem ${compact ? 'ItemCartItem-compact' : ''}`}>
          Cantidad: {quantity}
        </p>
      </section>

      <footer className={`ItemFooterCartItem ${compact ? 'ItemFooterCartItem-compact' : ''}`}>
        <p className={`InfoCartItem ${compact ? 'InfoCartItem-compact' : ''}`}>
          Subtotal: US$ {price * quantity}
        </p>
        <button
          className={`btn btn-danger custom-btn ${compact ? 'btn-compact' : ''}`}
          onClick={() => handleRemove(id)}
        >
          ❌
        </button>
      </footer>
    </article>
  );
};

export default CartItem;
