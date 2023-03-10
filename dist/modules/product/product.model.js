import mongoose from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);
const Order = mongoose.model("Order", orderSchema);
export default Order;
//# sourceMappingURL=order.model.js.map
