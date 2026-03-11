import React, { useContext, useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

const CATEGORIES = ['Polaroid', 'Bookmark', 'Eye Sketches', 'Portrait Sketches', 'Canvas'];

const Products = () => {
  const { products, addToCart, navigate } = useContext(ShopContext);
  const [addedItems, setAddedItems] = useState(new Set());
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    // Filter products that come from database (exclude static products with short IDs)
    // Include products with valid categories OR products without category (legacy products)
    const dbProducts = products.filter(p => {
      const isStaticProduct = p._id && typeof p._id === 'string' && p._id.length <= 15;
      if (isStaticProduct) return false; // Exclude static products
      
      // Include if it has a valid category or no category field (legacy products)
      if (!p.category) return true; // Legacy products without category
      return ['Polaroid', 'Bookmark', 'Eye Sketches', 'Portrait Sketches', 'Canvas'].includes(p.category);
    });
    
    console.log("All products:", products);
    console.log("Filtered DB products:", dbProducts);
    
    // Group products by category
    const grouped = {};
    CATEGORIES.forEach(cat => {
      grouped[cat] = dbProducts.filter(p => p.category === cat);
    });
    
    // Add "Other" category for products without category (legacy)
    const otherProducts = dbProducts.filter(p => !p.category);
    if (otherProducts.length > 0) {
      grouped['Other'] = otherProducts;
    }
    
    console.log("Products by category:", grouped);
    setProductsByCategory(grouped);
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

  const renderProductCard = (product) => (
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
  );

  const totalProducts = Object.values(productsByCategory).flat().length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="prata-regular text-4xl md:text-5xl font-bold text-[#111] mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Browse our collection of handcrafted products. Each item is carefully curated and made with love and attention to detail.
          </p>
        </div>

        {totalProducts === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <h2 className="prata-regular text-2xl font-bold text-gray-900 mb-4">
              No Products Available
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Please check back soon for our products. We're constantly adding new items to our collection.
            </p>
          </div>
        ) : (
          <>
            {/* Products by Category */}
            {CATEGORIES.map((category) => (
              productsByCategory[category] && productsByCategory[category].length > 0 && (
                <div key={category} className="mb-16">
                  {/* Category Header */}
                  <div className="mb-8">
                    <h2 className="prata-regular text-3xl md:text-4xl font-bold text-[#111] mb-2">
                      {category}
                    </h2>
                    <div className="w-20 h-1 bg-purple-600 rounded-full"></div>
                    <p className="text-gray-600 mt-3">
                      {productsByCategory[category].length} items available
                    </p>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {productsByCategory[category].map((product) => renderProductCard(product))}
                  </div>
                </div>
              )
            ))}

            {/* Other Products Section (Legacy products without category) */}
            {productsByCategory['Other'] && productsByCategory['Other'].length > 0 && (
              <div key="Other" className="mb-16">
                {/* Category Header */}
                <div className="mb-8">
                  <h2 className="prata-regular text-3xl md:text-4xl font-bold text-[#111] mb-2">
                    Other Products
                  </h2>
                  <div className="w-20 h-1 bg-purple-600 rounded-full"></div>
                  <p className="text-gray-600 mt-3">
                    {productsByCategory['Other'].length} items available
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {productsByCategory['Other'].map((product) => renderProductCard(product))}
                </div>
              </div>
            )}

            {/* Product Count Summary */}
            <div className="mt-16 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 text-center">
              <p className="text-gray-700">
                Showing <span className="font-bold text-[#111]">{totalProducts}</span> products across <span className="font-bold text-[#111]">{Object.values(productsByCategory).filter(arr => arr.length > 0).length}</span> categories
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
