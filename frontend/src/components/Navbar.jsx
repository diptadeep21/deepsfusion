import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaSearch, FaTimes, FaEye, FaHeart } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems, products, search, setSearch } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='relative w-full py-5 font-medium px-6 flex items-center justify-between'>

      {/* Logo */}
      <Link to="/" className='absolute left-1 top-2'>
        <img src={assets.logo} className='w-[280px] h-[55px] cursor-pointer' alt="Logo" />
      </Link>

      {/* Nav Links */}
      <ul className='mx-auto hidden sm:flex gap-8 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/products' className='flex flex-col items-center gap-1'>
          <p>Products</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6 absolute right-6 top-5">
        <button 
          onClick={() => setShowSearch(true)}
          className="p-1 hover:bg-gray-100 rounded-full transition duration-200"
        >
          <FaSearch className="w-5 h-5 text-gray-700" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative group">
          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />
          {/* ---------- Dropdown Menu ---------- */}
          {token &&
            <div className="group-hover:block hidden absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}
        </div>

        {/* Cart Icon */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 cursor-pointer' alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Wishlist Icon */}
        <Link to='/wishlist' className='relative'>
          <FaHeart className='w-5 h-5 text-gray-700 cursor-pointer' />
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt="Menu"
        />
      </div>

      {/* Mobile Slide-In Menu */}
      <div className={`fixed top-0 right-0 z-50 h-full bg-white transition-transform duration-300 ease-in-out ${visible ? 'w-full translate-x-0' : 'w-0 translate-x-full'} overflow-hidden`}>
        <div className='flex flex-col h-full text-gray-700'>

          {/* Back Button */}
          <div className='flex items-center gap-4 p-4 border-b shadow-sm'>
            <img
              src={assets.dropdown_icon}
              className='h-4 rotate-180 cursor-pointer'
              alt="Back"
              onClick={() => setVisible(false)}
            />
            <p onClick={() => setVisible(false)} className='text-sm cursor-pointer'>Back</p>
          </div>

          {/* Navigation Links */}
          <div className='flex flex-col gap-4 px-6 py-6 text-base'>
            <NavLink to='/' onClick={() => setVisible(false)} className="hover:text-black">Home</NavLink>
            <NavLink to='/products' onClick={() => setVisible(false)} className="hover:text-black">Products</NavLink>
            <NavLink to='/about' onClick={() => setVisible(false)} className="hover:text-black">About</NavLink>
            <NavLink to='/contact' onClick={() => setVisible(false)} className="hover:text-black">Contact</NavLink>
            <NavLink to='/wishlist' onClick={() => setVisible(false)} className="hover:text-black">Wishlist</NavLink>
            {token ? null : (
              <>
                <NavLink to='/login' onClick={() => setVisible(false)} className="hover:text-black">Login</NavLink>
                <NavLink to='/signup' onClick={() => setVisible(false)} className="hover:text-black">Sign Up</NavLink>
              </>
            )}
            {/* <NavLink to='/cart' onClick={() => setVisible(false)} className="hover:text-black">Cart</NavLink> */}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            {/* Search Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearch('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="overflow-y-auto max-h-[60vh]">
              {search.trim() === '' ? (
                <div className="p-6 text-center text-gray-500">
                  <FaSearch className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Start typing to search for products</p>
                </div>
              ) : (
                <div className="p-6">
                  {(() => {
                    const filteredProducts = products.filter(product =>
                      product.name.toLowerCase().includes(search.toLowerCase()) ||
                      product.category.toLowerCase().includes(search.toLowerCase()) ||
                      product.description.toLowerCase().includes(search.toLowerCase())
                    );

                    if (filteredProducts.length === 0) {
                      return (
                        <div className="text-center text-gray-500 py-8">
                          <p>No products found for "{search}"</p>
                          <p className="text-sm mt-2">Try searching with different keywords</p>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-4">
                          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                        </p>
                        {filteredProducts.map((product) => (
                          <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            onClick={() => {
                              setShowSearch(false);
                              setSearch('');
                            }}
                            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition duration-200 border border-gray-100"
                          >
                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-500">{product.category}</p>
                              <p className="text-sm text-gray-600 mt-1">₹{product.price}</p>
                            </div>
                            <FaEye className="text-gray-400" />
                          </Link>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
