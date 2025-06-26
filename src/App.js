import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Common Top Navigation */}
      <div className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/" className="font-semibold">🏠 Home</Link>
        <Link to="/cart" className="font-semibold">🛒 Cart</Link>
      </div>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
