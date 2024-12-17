import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart"
import CartItem from "../CartItem/CartItem";

const Cart = () => {
    const { cart, getTotal, totalQuantity, clearCart} = useCart();
    const total = getTotal()

    if(totalQuantity === 0){
        return (
          <>
            <br /><hr /><h1 className="text-center">Carrito</h1><hr /><br />
            <h3 className="text-center">No hay items en el carrito</h3>
    
          </>
        )};

  return (
    <div>
      <br /><hr /><h1 className="text-center">Carrito</h1><hr />

      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <h3 style={{ textAlign: "center" }}>Total: US$ {total}</h3>
      
      <div className="d-flex justify-content-center my-3">
        <button className="btn btn-outline-danger mx-2" onClick={clearCart}>Vaciar Carrito</button>
        <Link to="/checkout" className="btn btn-outline-success mx-2">
          Checkout
        </Link>
      </div>

      
    </div>
  );
}

export default Cart