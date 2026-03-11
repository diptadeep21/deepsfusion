import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className='py-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-semibold'>My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <button onClick={clearWishlist} className='text-sm px-3 py-1 rounded bg-gray-900 text-white'>
            Clear All
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className='text-gray-600'>
          <p>Your wishlist is empty.</p>
          <Link to='/' className='text-blue-600 underline'>Continue shopping</Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {wishlistItems.map(item => (
            <div key={item.id} className='border rounded p-4 flex items-center gap-4'>
              <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded' />
              <div className='flex-1'>
                <p className='font-medium'>{item.name}</p>
                <p className='text-sm text-gray-600'>₹{item.price}</p>
              </div>
              <button onClick={() => removeFromWishlist(item.id)} className='text-sm px-3 py-1 rounded border'>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
