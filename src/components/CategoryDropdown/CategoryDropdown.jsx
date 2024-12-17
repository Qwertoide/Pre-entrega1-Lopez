import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

const CategoryDropdown = ({ typeId, onCategorySelect }) => {
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada

  useEffect(() => {
    const fetchCategories = async () => {
      if (typeId === "Productos") {
        setLoading(true);
        try {
          const productsRef = collection(db, "products");
          const querySnapshot = await getDocs(productsRef);

          const uniqueCategories = new Set();
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.category) {
              uniqueCategories.add(data.category);
            }
          });

          setCategories([...uniqueCategories]);
        } catch (error) {
          console.error("Error al obtener categorías: ", error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCategories();
  }, [typeId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Actualiza la categoría seleccionada
    onCategorySelect(category); // Llama a la función padre
  };

  return (
    <>
      {typeId === "Productos" && (
        <div className="d-flex justify-content-center mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedCategory || "Seleccionar Categoría"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCategoryClick("")}>
                Todas las categorías
              </Dropdown.Item>
              {loading ? (
                <Dropdown.Item disabled>Cargando...</Dropdown.Item>
              ) : (
                categories.map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Dropdown.Item>
                ))
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default CategoryDropdown;
