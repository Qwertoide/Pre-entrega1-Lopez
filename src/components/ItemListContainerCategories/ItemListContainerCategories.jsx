
import { useEffect, useState } from "react";
import { getItems, getItemsByCategory } from "../../asyncMock";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import Condicional from "../ItemListContainer/ItemListContainer"



export default function ItemListContainerCategories() {
    const [products, setProducts] = useState([])
    const {typeId} = useParams()
    useEffect(()=>{    
          const asyncFunction = typeId ? getItemsByCategory : getItems
          asyncFunction(typeId)
            .then(data => setProducts(data))
    }, [typeId])
  
  return (
    <div>
  
      <Condicional/>
      
      <br />
      
      <ItemList products={products} />
  
    </div>
  );
  }