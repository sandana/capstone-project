import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Catalogue from './pages/Catalogue';
import Brands from './pages/Brands';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Delivery from './pages/Delivery';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';

const guard = (el) => <ProtectedRoute>{el}</ProtectedRoute>;

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/books/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/delivery" element={guard(<Delivery />)} />
          <Route path="/checkout/payment" element={guard(<Payment />)} />
          <Route path="/confirmation/:id" element={guard(<Confirmation />)} />
          <Route path="/orders" element={guard(<Orders />)} />
          <Route path="/orders/:id" element={guard(<OrderDetail />)} />
          <Route path="*" element={<p className="py-10 text-center">Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
}
