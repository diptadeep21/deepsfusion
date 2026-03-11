import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

/* =========================
   USER: PLACE ORDER
========================= */
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount
    } = req.body;

    console.log("================================");
    console.log("PLACE ORDER REQUEST");
    console.log("User ID:", userId);
    console.log("Order Items:", orderItems);
    console.log("Shipping Address:", shippingAddress);
    console.log("Payment Method:", paymentMethod);
    console.log("Total Amount:", totalAmount);
    console.log("================================");

    // Validation
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required and must be an array"
      });
    }

    if (!shippingAddress || typeof shippingAddress !== 'object') {
      return res.status(400).json({
        success: false,
        message: "Valid shipping address is required"
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid total amount is required"
      });
    }

    // Validate each order item
    const validatedOrderItems = orderItems.map((item, index) => {
      if (!item.productId) throw new Error(`Order item ${index}: productId is required`);
      if (!item.name) throw new Error(`Order item ${index}: name is required`);
      if (!item.price) throw new Error(`Order item ${index}: price is required`);
      if (!item.quantity) throw new Error(`Order item ${index}: quantity is required`);

      return {
        productId: String(item.productId),
        name: String(item.name),
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image ? String(item.image) : ""
      };
    });

    console.log("Validated Order Items:", validatedOrderItems);

    // Create order
    const orderData = {
      user: userId,
      orderItems: validatedOrderItems,
      shippingAddress: {
        name: String(shippingAddress.name),
        address: String(shippingAddress.address),
        city: String(shippingAddress.city),
        state: String(shippingAddress.state),
        pincode: String(shippingAddress.pincode),
        phone: String(shippingAddress.phone)
      },
      paymentMethod: paymentMethod || "COD",
      totalAmount: Number(totalAmount),
      paymentStatus: "pending",
      orderStatus: "placed"
    };

    console.log("Creating order with data:", orderData);

    const order = new orderModel(orderData);
    const savedOrder = await order.save();

    console.log("Order saved successfully:", savedOrder._id);

    // Clear user cart
    try {
      await userModel.findByIdAndUpdate(userId, { cartdata: {} });
    } catch (cartError) {
      console.warn("Warning: Could not clear cart:", cartError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });

  } catch (error) {
    console.error("❌ ORDER PLACEMENT ERROR:");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to place order",
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/* =========================
   USER: GET MY ORDERS
========================= */
const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
};

/* =========================
   ADMIN: GET ALL ORDERS
========================= */
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders"
    });
  }
};

/* =========================
   ADMIN: UPDATE ORDER STATUS
========================= */
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
      });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};


/* =========================
   ADMIN: DELETE ORDER
========================= */
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    await orderModel.findByIdAndDelete(orderId);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete order"
    });
  }
};

export {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};
