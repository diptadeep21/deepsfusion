import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaStar, FaHeart, FaTruck, FaShieldAlt, FaHeadset, FaGift, FaArrowLeft, FaCheck, FaMinus, FaPlus } from 'react-icons/fa';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, products } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');

  const [zoomImage, setZoomImage] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p._id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomImage(null)}
        >
          <img 
            src={zoomImage} 
            alt="Zoomed product" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition duration-200"
        >
          <FaArrowLeft />
          Back to Products
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div 
                className="aspect-square overflow-hidden rounded-lg border cursor-zoom-in group relative"
                onClick={() => setZoomImage(product.image[0])}
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-full">Click to Expand</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8 out of 5)</span>
                <span className="text-blue-600 hover:underline cursor-pointer">2,847 reviews</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </div>

              {/* Size Selector (If applicable) */}
              <div className='flex flex-col gap-4 my-8'>
                <p>Select Option</p>
                <div className='flex gap-2 flex-wrap'>
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((item, index) => (
                      <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                    ))
                  ) : (
                     <button onClick={() => setSize("Standard")} className={`border py-2 px-4 bg-gray-100 ${size === "Standard" ? 'border-orange-500' : ''}`}>Standard</button>
                  )}
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="space-y-3">
                <button
                  onClick={() => addToCart(product._id, size)}
                  className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
                >
                  ADD TO CART
                </button>
              </div>
              
              {/* Product Features */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-3">Product Features:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Handcrafted with premium materials</li>
                  <li>• Unique design for each piece</li>
                  <li>• Perfect for gifting</li>
                  <li>• Made with love and attention to detail</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {/* Shipping & Returns */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaTruck className="text-blue-600 text-xl mt-1" />
                <div>
                  <h4 className="font-semibold">Free Shipping</h4>
                  <p className="text-gray-600 text-sm">Free delivery on orders above ₹1000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaShieldAlt className="text-green-600 text-xl mt-1" />
                <div>
                  <h4 className="font-semibold">Quality Guarantee</h4>
                  <p className="text-gray-600 text-sm">100% satisfaction or money back</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaHeadset className="text-purple-600 text-xl mt-1" />
                <div>
                  <h4 className="font-semibold">24/7 Support</h4>
                  <p className="text-gray-600 text-sm">Always here to help you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Material:</span>
                <span className="font-medium">Premium Quality</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">Varies by product</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">Lightweight</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">You might also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products
              .filter(p => p.category === product.category && p._id !== product._id)
              .slice(0, 5)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  onClick={() => navigate(`/product/${relatedProduct._id}`)}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <img
                    src={relatedProduct.image[0]}
                    alt={relatedProduct.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h4 className="font-semibold text-sm text-gray-800 mb-1">{relatedProduct.name}</h4>
                  <p className="text-sm text-gray-600">₹{relatedProduct.price}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
