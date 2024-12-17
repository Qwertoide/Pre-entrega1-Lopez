import React from 'react';
import { Dropdown } from 'react-bootstrap';
// import { Items } from '../../asyncMock'; 
import { Link } from 'react-router-dom';

export const categoriasUnicas = [...new Set(Items.map(producto => producto.category))];

export function Boton() {
    return (
               <Dropdown.Menu>
               {categoriasUnicas.map((categoria, index) => (
                    <Dropdown.Item key={index} >
                        
                        <Link
                        className="nav-link active"
                        aria-current="page"
                        to={`/category/${categoria}`}
                        >
                            {categoria}    
                        </Link>
                   
                    </Dropdown.Item>
               ))}
             </Dropdown.Menu>
    )
  }


export function BotonesCategoria() {
    return (
        
        <Dropdown className="text-center">

            <Dropdown.Toggle variant="outline-dark" >
                Categorías
            </Dropdown.Toggle>
            <Boton/>
        </Dropdown>
    )
  }