
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Checkout from './components/Checkout/Checkout';
import Contacto from "./components/Contacto/Contacto.jsx"
import Cart from "./components/Cart/Cart.jsx";
import Texto from "./components/Texto/Texto.jsx"

import { CartProvider } from "./context/CartContext.jsx";
import { NotificationProvider } from "./context/NotificationContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";




export default function App() {



  return (
    <BrowserRouter>
      <NotificationProvider>
        <CartProvider>
        
          <NavBar/>

          <Routes>
            <Route path="/" element={<Home color="SkyBlue" text="Bienvenidos a Sorli Revestimientos" />} />
            <Route path="/texto" element={<Texto/>} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/contacto" element={<Contacto />} />
            <Route exact path="/type/:typeId" element={<ItemListContainer />} />
            <Route exact path="/category/:typeId" element={<ItemListContainer />} />
            <Route exact path="/detail/:typeId" element={<ItemDetailContainer />} />
            <Route path="*" element={<h1>404 Not found</h1>} />      
          </Routes>
        
        </CartProvider>
      </NotificationProvider>

    </BrowserRouter>
  )
}


