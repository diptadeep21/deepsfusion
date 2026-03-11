import React, { useState } from 'react';
import { FaHeart, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';

const HandpickedProducts = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showDemoWarning, setShowDemoWarning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  // Static handpicked products
  const products = [
    {
      _id: 'handpicked_1',
      name: 'Eye Sketch - Serenity',
      price: 499,
      image: ['https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=400&h=400&fit=crop']
    },
    {
      _id: 'handpicked_2',
      name: 'Bookmark - Classic Design',
      price: 199,
      image: ['https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=400&h=400&fit=crop']
    },
    {
      _id: 'handpicked_3',
      name: 'Canvas Painting - Abstract',
      price: 1299,
      image: ['https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=400&h=400&fit=crop']
    },
    {
      _id: 'handpicked_4',
      name: 'Watercolor Set',
      price: 799,
      image: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop']
    },
    {
      _id: 'handpicked_5',
      name: 'Handmade Sketching Pad',
      price: 349,
      image: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop']
    }
  ];

  const handleAddToCart = () => {
    // Show warning popup for demo products
    setShowDemoWarning(true);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < products.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="mt-8 px-4">
      {/* Demo Warning Modal */}
      {showDemoWarning && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-pulse-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Display Product</h3>
              <button
                onClick={() => setShowDemoWarning(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <p className="text-gray-800 font-medium text-center">
                This is a display/demo art image. Cannot add to cart. 
              </p>
              <p className="text-gray-700 text-center mt-2 font-semibold text-purple-600">
                To order, go to the Products section
              </p>
            </div>

            <button
              onClick={() => setShowDemoWarning(false)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mb-8">
        <div className="text-center">
          <h4 className="prata-regular text-2xl md:text-4xl font-bold leading-tight">
            {/* <span className="text-black">HANDPICKED </span>
            <span className="text-purple-600">FOR YOU</span> */}
          </h4>
          <p className="text-gray-600 text-sm md:text-base mt-2">Curated selection of our finest products</p>
        </div>
      </div>
      
      {products.length > 0 ? (
        <div className="relative max-w-7xl mx-auto mb-12">
          {/* Carousel Container */}
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
                {products.slice(currentIndex, currentIndex + itemsPerView).map((product) => {
                  const imageUrl = product.image && Array.isArray(product.image) && product.image.length > 0 
                    ? product.image[0] 
                    : null;
                  const productName = product.name && typeof product.name === 'string' ? product.name : 'Product';
                  const productPrice = product.price || 0;
                  
                  return (
                    <div 
                      key={product._id} 
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      {/* Image Container */}
                      <div 
                        className="relative w-full h-40 md:h-48 overflow-hidden bg-gray-200 flex items-center justify-center"
                      >
                        {imageUrl && imageUrl.trim() !== '' ? (
                          <img
                            key={imageUrl}
                            src={imageUrl}
                            alt={productName}
                            className="w-full h-full object-contain md:object-cover transform group-hover:scale-105 transition-transform duration-300"
                            onLoad={() => console.log("✅ Image loaded:", productName, imageUrl)}
                            onError={(e) => {
                              console.error("❌ Image failed to load:", productName, imageUrl);
                              e.target.style.display = 'none';
                              if (e.target.parentElement) {
                                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs"><span>Image not available</span></div>';
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                            <span className="text-xs md:text-sm">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="p-4">
                        <h3 
                          className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 h-10 leading-5"
                          title={productName}
                        >
                          {productName}
                        </h3>
                        <p className="text-sm md:text-base font-bold text-purple-600 mt-2">₹{productPrice}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="px-4 pb-4 flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                          }}
                          className={`flex-1 py-2 text-xs md:text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-semibold bg-black text-white hover:bg-gray-800`}
                        >
                          <span>Add</span>
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWishlistToggle(product);
                          }}
                          className={`p-2 rounded-lg transition-all duration-200 border ${
                            isInWishlist(product._id)
                              ? 'text-red-500 bg-red-50 border-red-200'
                              : 'text-gray-400 border-gray-200 hover:text-red-500 hover:bg-red-50 hover:border-red-200'
                          }`}
                          title={isInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <FaHeart className="text-base" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={handleNextClick}
              disabled={currentIndex >= products.length - itemsPerView}
              className={`flex-shrink-0 p-2 md:p-3 rounded-full transition-all duration-300 ${
                currentIndex >= products.length - itemsPerView
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
            {Array.from({ length: Math.max(0, products.length - itemsPerView + 1) }).map((_, index) => (
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
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No products available. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default HandpickedProducts;
