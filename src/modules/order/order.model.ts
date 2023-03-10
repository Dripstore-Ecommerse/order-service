import mongoose, { Schema } from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { IOrder, OrderModel } from "./order.interfaces";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId },
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

const Order = mongoose.model<IOrder, OrderModel>("Order", orderSchema);

export default Order;
