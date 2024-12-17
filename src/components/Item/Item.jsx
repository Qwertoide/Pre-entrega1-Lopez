import {Link} from "react-router-dom"

export default function Item({ product }) {
  return (
    <div className="card shadow h-100" style={{ width: "18rem" }}>
      <img
        src={product.img}
        alt={product.name}
        className="card-img-top"
        style={{ height: "12rem", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h2 className="card-title">{product.name}</h2>
        <h4>Precio: US$ {product.price}</h4>
        <Link to={`/detail/${product.id}`} className="btn btn-primary mt-auto">
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
