import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    orderItems: [
      {
        productId: {
          type: String,
          required: true
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String }
      }
    ],

    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      phone: { type: String, required: true }
    },

    paymentMethod: {
      type: String,
      default: "COD"
    },

    totalAmount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    orderStatus: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
      default: "placed"
    }
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
