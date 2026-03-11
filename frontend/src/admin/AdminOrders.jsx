import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { FaShoppingBag } from 'react-icons/fa';

const AdminOrders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = useCallback(async () => {
        if (!token) return null;
        try {
            const response = await axios.get(backendUrl + '/api/order/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setOrders(response.data.orders.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [backendUrl, token]);

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.put(
                backendUrl + `/api/order/${orderId}/status`,
                { orderStatus: event.target.value },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                await fetchAllOrders();
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    return (
        <div className="w-full animate-fade-in">
            <div className="mb-8">
                <h1 className="prata-regular text-3xl font-bold text-gray-900 mb-2">Orders</h1>
                <p className="text-gray-600">Manage and track your customer orders</p>
            </div>

            <div className="space-y-6">
                {orders.map((order, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr] gap-6 items-start">
                            {/* Icon */}
                            <div className="hidden md:flex justify-center items-center h-16 w-16 bg-purple-50 rounded-full text-purple-600">
                                <FaShoppingBag className="text-2xl" />
                            </div>

                            {/* Order Details */}
                            <div>
                                <div className="space-y-2 mb-4">
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                            <span className="font-medium text-gray-900">{item.name}</span>
                                            <span className="text-gray-500">x {item.quantity}</span>
                                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{item.size}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p className="font-semibold text-gray-900">{order.shippingAddress.name}</p>
                                    <p>{order.shippingAddress.address}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.pincode}</p>
                                    <p>{order.shippingAddress.phone}</p>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="text-sm space-y-2">
                                <p><span className="text-gray-500">Items:</span> {order.orderItems.length}</p>
                                <p><span className="text-gray-500">Method:</span> {order.paymentMethod}</p>
                                <p className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${order.isPaid ? 'bg-green-600' : 'bg-yellow-600'}`}></span>
                                    {order.isPaid ? 'Paid' : 'Pending'}
                                </p>
                                <p className="text-lg font-bold text-gray-900 mt-2">{currency}{order.totalAmount}</p>
                            </div>

                            {/* Status Select */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
                                <select 
                                    onChange={(event) => statusHandler(event, order._id)} 
                                    value={order.status} 
                                    className="block w-full px-3 py-2 text-sm border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-gray-50 cursor-pointer"
                                >
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                <p className="text-xs text-gray-400 mt-1">
                                    Date: {new Date(order.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;
