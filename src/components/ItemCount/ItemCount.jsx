import { useState } from "react";

export default function ItemCount({ initialValue = 1, disponible, onAdd, type }) {
  const [cantidad, setCantidad] = useState(initialValue);

  const decrement = () => {
    if (type === "Productos" && cantidad > 1) {
      setCantidad(cantidad => cantidad - 1);  
    }
  };

  const increment = () => {
    if (type === "Productos" && cantidad < disponible) {
      setCantidad(cantidad => cantidad + 1);  
    } else if (type !== "Productos" && cantidad < 1) {
      setCantidad(1);  
    }
  };

  return (
    <>


        {type === "Productos" && (
          <>
            <button onClick={increment} className="btn btn-primary">+</button>
            <h1 className="text-center mx-2">{cantidad}</h1>
            <button onClick={decrement} className="btn btn-primary">-</button>
          </>
        )}



        <button className="btn btn-primary" onClick={() => onAdd(cantidad)}>
        Agregar al carrito
        </button>
    </>
  );
}
