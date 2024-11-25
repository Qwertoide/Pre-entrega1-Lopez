import CartWidget from '../CartWidget/CartWidget';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { Link } from 'react-router-dom';


export default function NavBar() {
  return (
    <Navbar className="navbar navbar-expand-lg bg-body-tertiary w-100">

      <Container>
        <Link className="navbar-brand" to="/"> Sorli </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <NavDropdown title="Tienda" >
              
              <NavDropdown.Item >
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/type/Servicios"
                >
                  Servicios
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>                
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/type/Productos"
                >
                  Productos
                </Link>
              </NavDropdown.Item>
            
            </NavDropdown>
            
            <Nav.Link>
              <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/contacto"
              >
                  Contacto
              </Link>
            </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      
      <CartWidget totalPrecio={0} totalProductos={0}/>  
      </Container>   
    </Navbar>
  );
}
