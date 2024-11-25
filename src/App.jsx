
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemListContainerCategories from "./components/ItemListContainerCategories/ItemListContainerCategories.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Checkout from './components/Checkout/Checkout';
import Vaciar from "./components/Vaciar/Vaciar.jsx"
import Contacto from "./components/Contacto/Contacto.jsx"


export default function App() {

  return (
    <BrowserRouter>
    
    <NavBar/>

      <Routes>
        <Route exact path="/" element={<Home color="SkyBlue" text="Bienvenidos a Sorli Revestimientos" />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/vaciar" element={<Vaciar />} />
        <Route exact path="/contacto" element={<Contacto />} />
        <Route exact path="/type/:typeId" element={<ItemListContainer />} />
        <Route exact path="/category/:typeId" element={<ItemListContainerCategories />} />
        <Route exact path="/detail/:typeId" element={<ItemDetailContainer />} />
        <Route path="*" element={<h1>404 Not found</h1>} />      
      </Routes>


  
    </BrowserRouter>
  )
}


