
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import Home from "../Home/Home";






export default function ItemListContainer() {
    const [products, setProducts] = useState([])
    const {typeId} = useParams()


    if (typeId === "Productos") {
      useEffect(()=>{
        const collectionRef = typeId 
          ? query(collection(db, "products"), where("type", "==", typeId))
          : collection(db, "products")
  
          getDocs(collectionRef)
            .then((querySnapshot)=>{
              const productos = querySnapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
              })
              setProducts(productos)
            })
            .catch((err)=>{
              <Home color="Red" text={err} />
            })
  
      },[typeId])
    } if (typeId === "Servicios") {
      useEffect(()=>{
        const collectionRef = typeId 
          ? query(collection(db, "servicios"), where("type", "==", typeId))
          : collection(db, "products")
  
          getDocs(collectionRef)
            .then((querySnapshot)=>{
              const productos = querySnapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
              })
              setProducts(productos)
            })
            .catch((err)=>{
              <Home color="Red" text={err} />
            })
  
      },[typeId])
      
    }else{
      <Home color="Red" text="Error 404"/>
    }

    

  return (
    <div>

      <br />

      <h1 className="text-center"> {typeId} </h1>

      <br />
      
      <br />
      
      <ItemList products={products} />

    </div>
  );
}







