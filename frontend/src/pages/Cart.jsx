import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaHeart, FaShieldAlt, FaTruck, FaCreditCard } from 'react-icons/fa';

const Cart = () => {

  const { products, cartItems, updateQuantity, navigate, getCartAmount, delivery_fee, getCartCount } = useContext(ShopContext);
  
  const currency = '₹';

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  const features = [
    {
      icon: <FaShieldAlt className="text-2xl text-green-600" />,
      title: "Secure Checkout",
      description: "Your payment is protected"
    },
    {
      icon: <FaTruck className="text-2xl text-blue-600" />,
      title: "Free Shipping",
      description: "On orders above ₹500"
    },
    {
      icon: <FaCreditCard className="text-2xl text-purple-600" />,
      title: "Easy Returns",
      description: "30-day return policy"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition duration-200">
              <FaArrowLeft className="text-sm" />
              <span className="text-sm">Continue Shopping</span>
            </Link>
          </div>
          <h1 className="prata-regular text-3xl md:text-4xl font-bold text-[#111]">
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {getCartCount()} item{getCartCount() !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        {cartData.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-3xl text-gray-400" />
            </div>
            <h2 className="prata-regular text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to discover our beautiful handmade creations.
            </p>
            <Link
              to="/"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-200 font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="prata-regular text-xl font-bold text-[#111]">
                    Cart Items
                  </h2>
                </div>
                        
                <div className="divide-y divide-gray-200">
                  {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    
                    if (!productData) {
                      return null;
                    }
                    
                    return (
                    <div key={index} className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={productData.image && productData.image[0] ? productData.image[0] : 'https://via.placeholder.com/80'}
                            alt={productData.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {productData.name}
                          </h3>
                          <div className='flex items-center gap-5 mt-2'>
                                <p className="font-semibold">{currency}{productData.price}</p>
                                <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 text-sm'>{item.size}</p>
                          </div>
                        </div>
        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                           <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                        </div>
        
                        {/* Item Total */}
                        <div className="text-right min-w-0">
                          <p className="text-lg font-bold text-[#111]">
                            {currency}{(productData.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
        
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            className="p-2 text-gray-400 hover:text-red-500 transition duration-200"
                            title="Remove item"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>
              </div>
            </div>
        
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
                <h2 className="prata-regular text-xl font-bold text-[#111] mb-6">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{currency}{getCartAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{currency}{delivery_fee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{currency}{getCartAmount() === 0 ? '0.00' : (getCartAmount() + delivery_fee).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link to="/place-order" className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200 font-semibold mb-4 text-center block">
                  Proceed to Checkout
                </Link>

                {/* Features */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {cartData.length > 0 && (
          <div className="mt-16">
            <h2 className="prata-regular text-2xl font-bold text-[#111] mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.slice(0, 5).map((product) => (
                <div key={product._id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 border border-gray-200">
                  <div 
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="cursor-pointer"
                  >
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-3 transform hover:scale-105 transition duration-300"
                    />
                    <h3 className="font-semibold text-sm text-gray-800 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">₹{product.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="flex-1 py-1 text-sm bg-black text-white rounded hover:bg-gray-800 transition duration-150"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
