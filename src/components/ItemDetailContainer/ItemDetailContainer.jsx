import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import Home from "../Home/Home";

export default function ItemDetailContainer() {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const { typeId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", typeId));

        if (productDoc.exists()) {
          const prod = { id: productDoc.id, ...productDoc.data() };
          setProduct(prod);
        } else {
          const serviceDoc = await getDoc(doc(db, "servicios", typeId));

          if (serviceDoc.exists()) {
            const prod = { id: serviceDoc.id, ...serviceDoc.data() };
            setProduct(prod);
          } else {
            throw new Error("No se encontraron datos.");
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [typeId]);

  return (
    <div>
      <br />
      <hr />
      <h1 className="text-center">Detalle del producto</h1>
      <hr />

      {error ? (
        <Home color="Red" text={error} />
      ) : (
        <ItemDetail {...product} />
      )}
    </div>
  );
}
