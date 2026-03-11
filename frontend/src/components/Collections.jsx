import React, { useState } from 'react';
import { products } from '../assets/assets';
import { FaHeart, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Collections = () => {
  const { addToCart, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addedItems, setAddedItems] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarkIndex, setBookmarkIndex] = useState(0);
  const itemsPerView = 4;

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => new Set([...prev, product._id]));
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product._id);
        return newSet;
      });
    }, 2000);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const handleNextClick = () => {
    const handpickedProducts = products.slice(0, 5);
    if (currentIndex < handpickedProducts.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleBookmarkNextClick = () => {
    const bookmarkProducts = products.slice(5, 10);
    if (bookmarkIndex < bookmarkProducts.length - itemsPerView) {
      setBookmarkIndex(bookmarkIndex + 1);
    }
  };

  const handleBookmarkPrevClick = () => {
    if (bookmarkIndex > 0) {
      setBookmarkIndex(bookmarkIndex - 1);
    }
  };

  return (
    <div className="mt-8 px-4">
      {/* Row 1: Polaroids Carousel */}
      <div className="flex justify-center items-center mb-8">
        <h4 className="prata-regular text-xl md:text-3xl font-bold leading-tight text-center">
          <span className="text-black">HANDPICKED </span>
          <span className="text-gray-500">FOR YOU</span>
        </h4>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
            className={`flex-shrink-0 p-2 md:p-3 rounded-full transition-all duration-300 ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
            title="Previous products"
          >
            <FaChevronLeft className="text-lg md:text-xl" />
          </button>

          {/* Products Grid */}
          <div className="flex-1 overflow-hidden px-2 md:px-0">
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {products.slice(0, 5).slice(currentIndex, currentIndex + itemsPerView).map((item) => (
                <div key={item._id} className="border rounded-lg p-4 shadow-md hover:shadow-2xl transition duration-200 bg-white">
                  <div>
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded transform hover:scale-105 transition duration-300"
                    />
                    <h3 className="mt-2 font-semibold text-sm md:text-base text-gray-800 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className={`flex-1 py-1 text-xs md:text-sm rounded transition duration-150 flex items-center justify-center gap-2 ${
                        addedItems.has(item._id) || isInCart(item._id)
                          ? 'bg-green-600 text-white'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      {addedItems.has(item._id) || isInCart(item._id) ? (
                        <>
                          <FaCheck className="text-xs" />
                          Added
                        </>
                      ) : (
                        'Add'
                      )}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(item);
                      }}
                      className={`p-2 rounded transition duration-150 ${
                        isInWishlist(item._id)
                          ? 'text-red-500 bg-red-50'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <FaHeart className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNextClick}
            disabled={currentIndex >= products.slice(0, 5).length - itemsPerView}
            className={`flex-shrink-0 p-2 md:p-3 rounded-full transition-all duration-300 ${
              currentIndex >= products.slice(0, 5).length - itemsPerView
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
            title="Next products"
          >
            <FaChevronRight className="text-lg md:text-xl" />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.max(0, products.slice(0, 5).length - itemsPerView + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-purple-600 w-6' : 'bg-gray-300 w-2'
              }`}
              title={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Bookmarks Carousel */}
      <div className="flex justify-center items-center mb-8">
        <h4 className="prata-regular text-xl md:text-3xl font-bold leading-tight text-center">
          <span className="text-black">A BOOKMARK  </span>
          <span className="text-gray-500">FOR EVERY STORY</span>
        </h4>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          {/* Left Arrow Button */}
          <button
            onClick={handleBookmarkPrevClick}
            disabled={bookmarkIndex === 0}
            className={`flex-shrink-0 p-2 md:p-3 rounded-full transition-all duration-300 ${
              bookmarkIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
            title="Previous products"
          >
            <FaChevronLeft className="text-lg md:text-xl" />
          </button>

          {/* Products Grid */}
          <div className="flex-1 overflow-hidden px-2 md:px-0">
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {products.slice(5, 10).slice(bookmarkIndex, bookmarkIndex + itemsPerView).map((item) => (
                <div key={item._id} className="border rounded-lg p-4 shadow-md hover:shadow-2xl transition duration-200 bg-white">
                  <div>
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded transform hover:scale-105 transition duration-300"
                    />
                    <h3 className="mt-2 font-semibold text-sm md:text-base text-gray-800 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className={`flex-1 py-1 text-xs md:text-sm rounded transition duration-150 flex items-center justify-center gap-2 ${
                        addedItems.has(item._id) || isInCart(item._id)
                          ? 'bg-green-600 text-white'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      {addedItems.has(item._id) || isInCart(item._id) ? (
                        <>
                          <FaCheck className="text-xs" />
                          Added
                        </>
                      ) : (
                        'Add'
                      )}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(item);
                      }}
                      className={`p-2 rounded transition duration-150 ${
                        isInWishlist(item._id)
                          ? 'text-red-500 bg-red-50'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <FaHeart className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleBookmarkNextClick}
            disabled={bookmarkIndex >= products.slice(5, 10).length - itemsPerView}
            className={`flex-shrink-0 p-2 md:p-3 rounded-full transition-all duration-300 ${
              bookmarkIndex >= products.slice(5, 10).length - itemsPerView
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
            title="Next products"
          >
            <FaChevronRight className="text-lg md:text-xl" />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.max(0, products.slice(5, 10).length - itemsPerView + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setBookmarkIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === bookmarkIndex ? 'bg-purple-600 w-6' : 'bg-gray-300 w-2'
              }`}
              title={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Row 3: Eye Sketches */}
      <div className="flex justify-center items-center mb-6 gap-2">
        <h4 className="prata-regular text-xl md:text-3xl font-bold leading-tight text-center">
          <span className="text-black">MADE WITH </span>
          <span className="text-gray-500">LOVE</span>
        </h4>
        <FaHeart className="text-red-500 text-lg md:text-2xl mt-1" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-9 mb-10">
        {products.slice(10, 15).map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-md hover:shadow-2xl transition duration-200 bg-white">
            <div>
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-full h-40 object-cover rounded transform hover:scale-105 transition duration-300"
              />
              <h3 className="mt-2 font-semibold text-sm md:text-base text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
                className={`flex-1 py-1 text-sm rounded transition duration-150 flex items-center justify-center gap-2 ${
                  addedItems.has(item._id) || isInCart(item._id)
                    ? 'bg-green-600 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {addedItems.has(item._id) || isInCart(item._id) ? (
                  <>
                    <FaCheck className="text-xs" />
                    Added
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlistToggle(item);
                }}
                className={`p-2 rounded transition duration-150 ${
                  isInWishlist(item._id)
                    ? 'text-red-500 bg-red-50'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <FaHeart className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Row 4: Canvases */}
      <div className="flex justify-center items-center mb-6">
        <h4 className="prata-regular text-xl md:text-3xl font-bold leading-tight text-center">
          <span className="text-black">CANVAS STORIES  </span>
          <span className="text-gray-500">FOR YOU WALLS</span>
        </h4>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {products.slice(15, 20).map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-md hover:shadow-2xl transition duration-200 bg-white">
            <div>
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-full h-40 object-cover rounded transform hover:scale-105 transition duration-300"
              />
              <h3 className="mt-2 font-semibold text-sm md:text-base text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
                className={`flex-1 py-1 text-sm rounded transition duration-150 flex items-center justify-center gap-2 ${
                  addedItems.has(item._id) || isInCart(item._id)
                    ? 'bg-green-600 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {addedItems.has(item._id) || isInCart(item._id) ? (
                  <>
                    <FaCheck className="text-xs" />
                    Added
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlistToggle(item);
                }}
                className={`p-2 rounded transition duration-150 ${
                  isInWishlist(item._id)
                    ? 'text-red-500 bg-red-50'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <FaHeart className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
