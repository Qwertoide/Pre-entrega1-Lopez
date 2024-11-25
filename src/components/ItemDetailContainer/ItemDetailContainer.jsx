import { useParams } from "react-router-dom";
import { getItemByID } from "../../asyncMock";
import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";




export default function ItemDetailContainer() {
  const [product, setProduct] = useState({})
  const {typeId} = useParams()

  useEffect(()=>{
    getItemByID(typeId)
      .then((resp) => {
        setProduct(resp)
      })
  }, [typeId])

  return (
    <div>
      <br />
      <hr />
      <h2>Detalle del producto</h2>
      <hr />
      <br />
      <ItemDetail {...product} />
    </div>
  );
}