import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';
import { Link, NavLink } from 'react-router-dom';

export default function CartWidget({totalPrecio, totalProductos}){
    return(
        <Dropdown>

                                
                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">

                    <Row>
                        <Col>

                                <Figure.Image 
                                width={50}
                                height={50}
                                src="https://static.vecteezy.com/system/resources/thumbnails/019/787/018/small_2x/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
                                />

                        </Col>

                        <Col>
                            {totalProductos}
                        </Col> 

                    </Row>
                
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
    
                    <Dropdown.ItemText>Total {totalPrecio}$</Dropdown.ItemText>

                    <Dropdown.Item>              
                        <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/vaciar"
                        >
                        Vaciar
                        </Link>
                    </Dropdown.Item>

                    <Dropdown.Item >                        
                        <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/checkout"
                        >
                        Comprar
                        </Link>
                    </Dropdown.Item>
    
                </Dropdown.Menu>
    
                
        </Dropdown>
    );
}