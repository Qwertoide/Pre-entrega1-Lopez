import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNotification } from "../../context/NotificationContext";

const Checkout = ({ compact = false }) => {
  const { setNotification } = useNotification();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [detalle, setDetalle] = useState("");

  const [loading, setLoading] = useState(false);

  const { cart, totalQuantity, getTotal, clearCart } = useCart();
  const total = getTotal();

  const navigate = useNavigate();

  const createOrder = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto
    setLoading(true);

    try {
      if (cart.length === 0) {
        setNotification("danger", "No hay productos en el carrito");
        setLoading(false);
        return;
      }

      const objOrder = {
        buyer: {
          firstName: nombre,
          lastName: apellido,
          phone: telefono,
          address: direccion,
          detail: detalle,
        },
        items: cart,
        totalQuantity,
        total,
        date: new Date(),
      };

      const ids = cart.map((item) => item.id);

      // Verificar stock
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

        setNotification("success", `Orden creada con éxito. ID: ${orderAdded.id}`);
        clearCart();
        navigate('/texto', { state: { color: 'green', text: `El id de su orden es ${orderAdded.id}` } });
      } else {
        const productNames = outOfStock.map((p) => p.name).join(", ");
        setNotification("danger", `Sin stock: ${productNames}`);
        navigate('/texto', { state: { color: 'red', text: `Sin stock: ${productNames}` } });
      }
    } catch (error) {
      setNotification("danger", "Ocurrió un error al generar la orden");
      console.error("Error al crear la orden: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <hr />
      <h1 className="text-center">Checkout</h1>
      <hr />

      <Container>
        <Form onSubmit={createOrder}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              onChange={(e) => setApellido(e.target.value)}
              value={apellido}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              onChange={(e) => setTelefono(e.target.value)}
              value={telefono}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              onChange={(e) => setDireccion(e.target.value)}
              value={direccion}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalle</Form.Label>
            <Form.Control
              onChange={(e) => setDetalle(e.target.value)}
              value={detalle}
              type="text"
              placeholder="Ej: No funciona el timbre, casa al fondo, etc..."
            />
          </Form.Group>

          <div className="d-flex justify-content-center p-3">
            <button className="btn btn-outline-success" type="submit" disabled={loading}>
              {loading ? "Procesando..." : "Finalizar compra"}
            </button>
          </div>
        </Form>
      </Container>

      {/* Productos en el carrito */}
      <div>
        {cart.map((item) => (
          <article key={item.id} className={`CardCartItem bg-body-tertiary ${compact ? 'CardCartItem-compact' : ''}`}>
            <header className={`HeaderCartItem ${compact ? 'HeaderCartItem-compact' : ''}`}>
              <h3 className={`ItemHeaderCartItem ${compact ? 'ItemHeaderCartItem-compact' : ''}`}>
                {item.name}
              </h3>
            </header>

            <section className={`ContainerItemCartItem ${compact ? 'ContainerItemCartItem-compact' : ''}`}>
              <p className={`ItemCartItem ${compact ? 'ItemCartItem-compact' : ''}`}>
                Cantidad: {item.quantity}
              </p>
            </section>
          </article>
        ))}
      </div>
    </>
  );
};

export default Checkout;
