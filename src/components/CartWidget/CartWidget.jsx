import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { useCart } from "../../hooks/useCart";
import './CartWidget.css';
import CartItem from '../CartItem/CartItem';

export default function CartWidget() {
    const { cart, getTotal, totalQuantity, clearCart } = useCart();
    const total = getTotal();

    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                <img
                    src="../../../public/assets/img/carrito.png"
                    className="CartImg"
                    style={{ width: 25 }}
                    alt="cart-widget"
                />
                {totalQuantity}
            </Dropdown.Toggle>

            <Dropdown.Menu className="custom-dropdown-menu">
                
                {cart.map((item) => (
                <CartItem key={item.id} {...item} compact={true} />
                ))}

                <Dropdown.ItemText className="fw-bold">Total: {total}$</Dropdown.ItemText>

                <Dropdown.Item>
                    <Link onClick={clearCart} className="nav-link active text-center" aria-current="page">
                        Vaciar carrito
                    </Link>
                </Dropdown.Item>

                <Dropdown.Item>
                    <Link className="nav-link active text-center" to="/cart">
                        Comprar
                    </Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
