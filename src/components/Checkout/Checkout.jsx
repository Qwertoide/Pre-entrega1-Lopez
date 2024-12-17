import { useState } from "react"
import { useCart } from "../../hooks/useCart"
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from "firebase/firestore"
import { db } from "../../services/firebase"
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


const Checkout = ({compact = false }) => {
  //const [form, setForm] = useState({})
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [detalle, setDetalle] = useState("");

  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  const { cart, totalQuantity, getTotal, clearCart } = useCart();
  const total = getTotal();

  const navigate = useNavigate();

  const createOrder = async () => {
    setLoading(true);
    try {
      const objOrder = {
        buyer: {
          firstName: nombre,
          lastName: apellido,
          phone: telefono,
          addres: direccion,
          detail: detalle,
        },
        items: cart,
        totalQuantity,
        total,
        date: new Date(),
      };

      const ids = cart.map((item) => item.id);


      const productRef = collection(db, "products");

      const productsAddedFromFirestore = await getDocs(
        query(productRef, where(documentId(), "in", ids))
      );
      const { docs } = productsAddedFromFirestore;

      const outOfStock = [];
      const batch = writeBatch(db);

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDB = dataDoc.stock;

        const productAddedToCart = cart.find((prod) => prod.id === doc.id);
        const productQuantity = productAddedToCart?.quantity;

        if (stockDB >= productQuantity) {
          batch.update(doc.ref, { stock: stockDB - productQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }
      });



      if (outOfStock.length === 0) {
        await batch.commit();
      
        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, objOrder);
      
        setOrderCreated(true);
        clearCart();
      

        navigate('/texto', { state: { color: 'Green', text: `El id de su orden es ${orderAdded.id}` } });
      } else {
        navigate('/texto', { state: { color: 'red', text: 'Hay productos que están fuera de stock' } });
      }
      
    } catch (error) {
    
      navigate('/texto', { state: { color: 'red', text: 'Hay productos que están fuera de stock' } });

    } finally {
      setLoading(false);
    }

    if (loading) {
      return <h1>Se esta generando la orden</h1>;
    }

    if (orderCreated) {
      return <h1>La orden fue creada correctamente</h1>;
    }
  };

  return (
    <>
      <br /><hr /><h1 className="text-center">Checkout</h1><hr />
      <Container>
        <Form>
          <Form.Group className="mb-3" >
            <Form.Label>Nombre</Form.Label>
            <Form.Control onChange={(e) => setNombre(e.target.value)} value={nombre} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Apellido</Form.Label>
            <Form.Control onChange={(e) => setApellido(e.target.value)} value={apellido} type="text"  />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Telefono</Form.Label>
            <Form.Control onChange={(e) => setTelefono(e.target.value)} value={telefono} type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control onChange={(e) => setDireccion(e.target.value)} value={direccion} type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalle</Form.Label>
            <Form.Control onChange={(e) => setDetalle(e.target.value)} value={detalle} type="text" placeholder="No funciona el timbre, casa al fondo, etc..." />
          </Form.Group>
        </Form>
      </Container>

      <div>
        {cart.map((item) => (
           <article 
           key={item.id}
           className={`CardCartItem bg-body-tertiary ${compact ? 'CardCartItem-compact' : ''}`}
         >
           <header className={`HeaderCartItem ${compact ? 'HeaderCartItem-compact' : ''}`}>
             <h3 className={`ItemHeaderCartItem ${compact ? 'ItemHeaderCartItem-compact' : ''}`}>
               {item.name}
             </h3>
           </header>
     
           <section className={`ContainerItemCartItem ${compact ? 'ContainerItemCartItem-compact' : ''}`}>
             <p className={`ItemCartItem ${compact ? 'ItemCartItem-compact' : ''}`}>
               Cantidad: {totalQuantity}
             </p>
           </section>
         </article>
        ))}
      </div>
      


      <div className="d-flex justify-content-center p-3 ">
        <button className="btn btn-outline-success" onClick={createOrder}>
          Finalizar compra
        </button>
      </div>
    </>
  );
}

export default Checkout
