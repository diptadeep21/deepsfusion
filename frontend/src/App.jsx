import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Wishlist from './pages/Wishlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin Imports
import AdminLogin from './admin/AdminLogin';
import AdminOrders from './admin/AdminOrders';
import AdminAddProduct from './admin/AdminAddProduct';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './admin/AdminLayout';

const UserLayout = () => (
  <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Navbar />
    <Outlet />
  </div>
);

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path='dashboard' element={<AdminOrders />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='add' element={<AdminAddProduct />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
