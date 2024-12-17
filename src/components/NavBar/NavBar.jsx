import CartWidget from '../CartWidget/CartWidget';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./NavBar.css"

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">

      <Container >
        <NavLink className="navbar-brand" to="/"> Sorli </NavLink>
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
            
            <NavLink
              className="nav-link"
              aria-current="page"
              to="/contacto"
            >
              Contacto
            </NavLink>
          
          </Nav>
        </Navbar.Collapse>
      
      <CartWidget totalPrecio={0} totalProductos={0}/>  
      </Container>   
    </Navbar>
  );
}
