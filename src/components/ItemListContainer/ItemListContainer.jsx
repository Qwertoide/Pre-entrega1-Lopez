import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";

export default function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const { typeId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = () => {
      let collectionRef;

      if (typeId === "Productos") {

        collectionRef = selectedCategory
          ? query(collection(db, "products"), where("category", "==", selectedCategory))
          : collection(db, "products");
      } else if (typeId === "Servicios") {
        collectionRef = collection(db, "servicios");
      } else {
        return;
      }

      getDocs(collectionRef)
        .then((querySnapshot) => {
          const productos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productos);
        })
        .catch((err) => {
          console.error("Error al cargar productos:", err);
        });
    };

    fetchProducts();
  }, [typeId, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <br /><hr /><h1 className="text-center">{typeId}</h1><hr /><br />

      <CategoryDropdown typeId={typeId} onCategorySelect={handleCategorySelect} />

      <br />
      <ItemList products={products} />
    </div>
  );
}
