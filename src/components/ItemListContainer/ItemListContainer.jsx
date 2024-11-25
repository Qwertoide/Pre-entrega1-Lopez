
import { useEffect, useState } from "react";
import { getItems, getItemsByCategory, getItemsByType, Items } from "../../asyncMock";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { BotonesCategoria } from "../BotonesCategoria/BotonesCategoria"



export const Condicional= () => {
  const { typeId, categoryId } = useParams();


  const funciones = {

    Productos: () => <BotonesCategoria/>,
    Ceramica: () => <BotonesCategoria/>,
    "Piso flotante": () => <BotonesCategoria/>,
    Porcelanato: () => <BotonesCategoria/>,

  }
    

  
  const renderContenido = funciones[typeId] || funciones[categoryId] || (() => <div/>);
  
  return (
    <div>
      {renderContenido()}
    </div>
  );
}



function getKeyByValue(value) {
  return Object.keys(Items).find((key) =>
    Items[key].includes(value)
  );
}



export default function ItemListContainer() {
    const [products, setProducts] = useState([])
    const {typeId} = useParams()
    
    useEffect(()=>{    
          const asyncFunction = typeId ? getItemsByType : getItemsByCategory
          asyncFunction(typeId)
            .then(data => setProducts(data))
    }, [typeId])

  return (
    <div>

      <br />

      <h2> {typeId} </h2>

      <br />

      <Condicional/>
      
      <br />
      
      <ItemList products={products} />

    </div>
  );
}







