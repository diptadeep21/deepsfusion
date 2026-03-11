import React, { useContext, useState, useEffect } from 'react';
import { FaHeart, FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

const AdminProducts = () => {
  const { products, addToCart, navigate } = useContext(ShopContext);
  const [addedItems, setAddedItems] = useState(new Set());
  const [adminProducts, setAdminProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    // Filter products that come from database (have _id property)
    const dbProducts = products.filter(p => p._id && typeof p._id === 'string' && p._id.length > 15);
    setAdminProducts(dbProducts);
  }, [products]);

  const handleAddToCart = (product) => {
    addToCart(product._id, 'Standard');
    setAddedItems(prev => new Set([...prev, product._id]));
    
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product._id);
        return newSet;
      });
    }, 2000);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Pagination logic
  const totalPages = Math.ceil(adminProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = adminProducts.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (adminProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-20 px-4">
      {/* Section Header */}
      <div className="flex justify-center items-center mb-12">
        <h2 className="prata-regular text-3xl md:text-4xl font-bold leading-tight text-center">
          <span className="text-black">SHOP </span>
          <span className="text-gray-500">OUR PRODUCTS</span>
        </h2>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {currentProducts.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Product Image */}
              <div 
                onClick={() => handleProductClick(product._id)}
                className="cursor-pointer mb-3 overflow-hidden rounded-lg bg-gray-100 aspect-square"
              >
                <img
                  src={product.image && product.image[0] ? product.image[0] : 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
                />
              </div>

              {/* Product Info */}
              <div onClick={() => handleProductClick(product._id)} className="cursor-pointer mb-3">
                <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {product.category}
                </p>
                <p className="text-lg font-bold text-[#111] mt-2">
                  ₹{product.price?.toFixed(2) || '0.00'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-1 ${
                    addedItems.has(product._id)
                      ? 'bg-green-600 text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {addedItems.has(product._id) ? (
                    <>
                      <FaCheck className="text-xs" />
                      Added
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-16">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border transition duration-200 ${
              currentPage === 1
                ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                : 'border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            <FaArrowLeft />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-lg font-semibold transition duration-200 ${
                  page === currentPage
                    ? 'bg-black text-white'
                    : 'border border-gray-300 text-gray-700 hover:border-black'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border transition duration-200 ${
              currentPage === totalPages
                ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                : 'border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      )}

      {/* Info Banner */}
      <div className="max-w-7xl mx-auto mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">💡 All Products Are Carefully Curated</h3>
        <p className="text-gray-600 text-sm md:text-base">
          Each item in our collection is handpicked by our team of experts. We ensure quality, originality, and uniqueness in every product.
        </p>
      </div>
    </div>
  );
};

export default AdminProducts;
