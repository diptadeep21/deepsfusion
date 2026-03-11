import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
      status: 'pending',
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ...orderData
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const getOrders = () => {
    return orders;
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrders,
    getOrderById,
    clearOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

