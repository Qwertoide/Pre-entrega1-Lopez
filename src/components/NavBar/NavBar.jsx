import CartWidget from '../CartWidget/CartWidget';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">

      <Container>
        <Navbar.Brand href="#home">Sorli</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <NavDropdown title="Tienda" id="basic-nav-dropdown">
              
              <NavDropdown.Item href="#action/3.1">Servicios</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Productos</NavDropdown.Item>
            
            </NavDropdown>
            
            <Nav.Link href="#home">Contacto</Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      
      <CartWidget/>  
      </Container>   
    </Navbar>
  );
}
