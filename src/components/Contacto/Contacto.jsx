import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function TextControlsExample() {
  return (
    <>
    <br />
    <h1 className="text-center">Contacto</h1>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control type="email" placeholder="Ejemplo@correo.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={3}  placeholder="Escriba su mensaje aqui..." />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
