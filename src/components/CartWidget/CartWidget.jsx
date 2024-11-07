import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';

export default function CartWidget(){
    return(
        <Dropdown>

                                
                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">

                    <Row>
                        <Col>

                                <Figure.Image 
                                width={50}
                                height={50}
                                src="src/assets/img/shopping-cart-emoji-clipart-xl.png"
                                />

                        </Col>

                        <Col>
                            0
                        </Col> 

                    </Row>
                
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
    
                    <Dropdown.ItemText href="">Total 0$</Dropdown.ItemText>
                    <Dropdown.Item href="">Vaciar</Dropdown.Item>
                    <Dropdown.Item href="">Comprar</Dropdown.Item>
    
                </Dropdown.Menu>
    
                
        </Dropdown>
    );
}