import { useState } from "react";


export default function ItemCount({initialValue=1 , disponible, onAdd} ){
    
    const [cantidad, setCantidad] = useState(initialValue)

    const decrement = () => {
        if(cantidad > 1){
            setCantidad(cantidad => cantidad-1)
        }
    }
    
    const increment = () => {
        if(cantidad <  disponible ){
            setCantidad(cantidad => cantidad+1)        
        }
    }
    
    return (
    <>

    <button onClick={increment} className="btn btn-primary">+</button>
    
    <h1 className="text-center">{cantidad}</h1>
    
    <button onClick={decrement} className="btn btn-primary">-</button>
    
    <button className="btn btn-primary" onClick={() => onAdd(cantidad)} >Agregar al carrito</button>
    

    </>
    );
}