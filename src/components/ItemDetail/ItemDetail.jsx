import { Link } from "react-router-dom"



export default function ItemDetail({name, img, description, price, stock}) {
  
  return (
    <div className="container">

        <div className="card " style={{ width: '30rem' }}>
            <img 
                src={img}
                style={{ maxWidth: '100%' }}
                className="img-fluid "
                alt={name}
            />

            <div className="card-body">
              <h1>{name}</h1>
                <p>{description}</p>
                <p>Precio: ${price}</p>
                <p>Disponible: {stock}</p>
            </div>
            <Link to="/checkout" className="btn btn-primary" >Finalizar compra</Link>
        </div>
    </div>
  )
}