import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import { useCart } from "../../hooks/useCart";
import { useNotification } from "../../context/NotificationContext";

export default function ItemDetail({ type, id, name, img, description, price, stock }) {
  const { addItem, isInCart } = useCart();
  const { setNotification } = useNotification();

  const handleAdd = (count) => {
    const productToAdd = {
      id,
      name,
      price,
      quantity: count,
    };
    addItem(productToAdd);
    setNotification("success", `Se agregaron ${count} de ${name}`);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow" style={{ width: "30rem" }}>
        <img
          src={img}
          style={{ maxWidth: "100%" }}
          className="img-fluid"
          alt={name}
        />
        <div className="card-body">
          <h1>{name}</h1>
          <br />
          <h4>{description}</h4>
          <br />
          <p>Precio: US$ {price}</p>


          {type === "Productos" && <p>Stock: {stock}</p>}
        </div>

        {
          isInCart(id) ? (
            <Link to="/cart" className="btn btn-primary">Finalizar compra</Link>
          ) : (
            <ItemCount 
              disponible={stock} 
              onAdd={handleAdd} 
              type={type}  
            />
          )
        }

      </div>
    </div>
  );
}
