// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client' // ✅ fixed this
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </ShopContextProvider>
  </BrowserRouter>,
)
