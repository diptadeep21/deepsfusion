import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product._id);

      if (existingItem) {
        // Item already in wishlist
        return prevItems;
      } else {
        // Add new item to wishlist
        return [
          ...prevItems,
          {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image[0],
            category: product.category,
            date: Date.now(),
          },
        ];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
