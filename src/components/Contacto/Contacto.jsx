import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNotification } from "../../context/NotificationContext";
import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../services/firebase';

export default function TextControlsExample() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { setNotification } = useNotification();

  const createMensaje = async (e) => {
    e.preventDefault();

    try {
      if (message.trim() !== "" && email.trim() !== "") {
        const objOrder = {
          client: {
            correo: email,
            mensaje: message,
          },
          date: new Date(),
        };

        const orderRef = collection(db, "Mensajes");
        await addDoc(orderRef, objOrder);

        setNotification("success", "Su mensaje ha sido enviado");
      } else {
        setNotification("danger", "Ninguna casilla puede estar vacía");
      }
    } catch (error) {
      setNotification("danger", error.message);
    }
  };
  

  return (
    <>
      <br />
      <hr />
      <h1 className="text-center">Contacto</h1>
      <hr />

      <Container>
        <Form onSubmit={createMensaje}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Ejemplo@correo.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              as="textarea"
              rows={5}
              placeholder="Escriba su mensaje aquí..."
            />
          </Form.Group>

          <div className="d-flex justify-content-center p-3">
            <button className="btn btn-outline-dark" type="submit">
            Enviar
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
}


