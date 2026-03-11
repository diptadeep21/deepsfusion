import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { FaTruck, FaCheckCircle, FaClock, FaBox, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Orders = () => {

  const { backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return;
      }

      setLoading(true);
      console.log("Fetching orders from:", backendUrl + '/api/order/my-orders');

      const response = await axios.get(backendUrl + '/api/order/my-orders', { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      console.log("Orders Response:", response.data);

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      if (error.response?.data) {
        console.error("Error Response:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (loading) {
    return (
      <div className='border-t pt-16'>
        <div className='text-center py-12'>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto mb-4"></div>
          <p className='text-gray-600'>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className='border-t pt-16'>
        <div className='text-2xl mb-8'>
          <h2 className='inline-flex items-center gap-2 font-medium'>MY ORDERS</h2>
        </div>
        <div className='text-center py-16'>
          <FaBox className='text-6xl text-gray-300 mx-auto mb-4' />
          <p className='text-gray-600 text-lg'>No orders yet</p>
          <p className='text-gray-500 text-sm mt-2'>Start shopping to place your first order</p>
        </div>
      </div>
    );
  }

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl mb-8'>
        <h2 className='inline-flex items-center gap-2 font-medium'>MY ORDERS</h2>
      </div>

      <div className='space-y-6'>
        {orders.map((order) => (
          <div key={order._id} className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
            {/* Order Header */}
            <div className='bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
              <div>
                <p className='text-sm text-gray-500'>Order ID</p>
                <p className='font-semibold text-gray-900'>{order._id}</p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-gray-500'>Order Date</p>
                <p className='font-semibold text-gray-900'>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className='px-6 py-4'>
              <h3 className='text-sm font-semibold text-gray-900 mb-3'>Order Items</h3>
              <div className='space-y-3'>
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className='flex items-center justify-between pb-3 border-b border-gray-100 last:border-b-0'>
                    <div className='flex-1'>
                      <p className='font-medium text-gray-900'>{item.name}</p>
                      <p className='text-sm text-gray-600'>Quantity: {item.quantity}</p>
                    </div>
                    <div className='text-right'>
                      <p className='font-semibold text-gray-900'>₹{item.price.toFixed(2)}</p>
                      <p className='text-sm text-gray-600'>₹{(item.price * item.quantity).toFixed(2)} total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className='px-6 py-4 bg-blue-50 border-t border-gray-200'>
              <h3 className='text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2'>
                <FaMapMarkerAlt className='text-blue-600' />
                Shipping Address
              </h3>
              <div className='text-sm text-gray-700 space-y-1'>
                <p className='font-medium'>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                <p className='flex items-center gap-2'><FaPhone className='text-blue-600' /> {order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className='px-6 py-4 border-t border-gray-200'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {/* Total Amount */}
                <div>
                  <p className='text-sm text-gray-500'>Total Amount</p>
                  <p className='text-lg font-bold text-gray-900'>₹{order.totalAmount.toFixed(2)}</p>
                </div>

                {/* Payment Method */}
                <div>
                  <p className='text-sm text-gray-500'>Payment Method</p>
                  <p className='font-semibold text-gray-900'>{order.paymentMethod}</p>
                </div>

                {/* Payment Status */}
                <div>
                  <p className='text-sm text-gray-500'>Payment Status</p>
                  <p className={`font-semibold flex items-center gap-1 ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.paymentStatus === 'paid' ? <FaCheckCircle /> : <FaClock />}
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </p>
                </div>

                {/* Order Status */}
                <div>
                  <p className='text-sm text-gray-500'>Order Status</p>
                  <p className={`font-semibold flex items-center gap-1 ${order.orderStatus === 'delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                    {order.orderStatus === 'delivered' ? <FaCheckCircle /> : <FaTruck />}
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
