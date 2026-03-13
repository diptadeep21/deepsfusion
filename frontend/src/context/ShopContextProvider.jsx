import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "./ShopContext";

const ShopContextProvider = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Authentication state
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );

  // Products state
  const [products, setProducts] = useState([]);

  // Cart state
  const [cartItems, setCartItems] = useState({});

  // Search state
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Save token to localStorage
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // Fetch products from backend
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.log('Error fetching products:', error);
      setProducts([]);
    }
  }, [backendUrl]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Add product to cart
  const addToCart = (productId, size = 'Standard') => {
    const cartData = structuredClone(cartItems);

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }

    setCartItems(cartData);
  };

  // Update cart quantity
  const updateQuantity = (productId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[productId][size];
      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }
    } else {
      cartData[productId][size] = quantity;
    }

    setCartItems(cartData);
  };

  // Get cart count (total number of items)
  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  // Get cart amount (total price)
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId);
      if (product) {
        for (const size in cartItems[productId]) {
          totalAmount += product.price * cartItems[productId][size];
        }
      }
    }
    return totalAmount;
  };

  const value = {
    // Authentication
    token,
    setToken,
    
    // Basic info
    currency,
    delivery_fee,
    backendUrl,
    navigate,
    
    // Products
    products,
    setProducts,
    fetchProducts,
    
    // Cart
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    
    // Search
    search,
    setSearch,
    showSearch,
    setShowSearch
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;