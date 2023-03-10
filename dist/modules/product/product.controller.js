import httpStatus from "http-status";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import ApiError from "../errors/ApiError";
import pick from "../utils/pick";
import * as orderService from "./order.service";
export const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);
  res.status(httpStatus.CREATED).send(order);
});
export const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "projectBy"]);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});
export const getOrder = catchAsync(async (req, res) => {
  if (typeof req.params["orderId"] === "string") {
    const order = await orderService.getOrderById(
      new mongoose.Types.ObjectId(req.params["orderId"])
    );
    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
    }
    res.send(order);
  }
});
export const updateOrder = catchAsync(async (req, res) => {
  if (typeof req.params["orderId"] === "string") {
    const order = await orderService.updateOrderById(
      new mongoose.Types.ObjectId(req.params["orderId"]),
      req.body
    );
    res.send(order);
  }
});
export const deleteOrder = catchAsync(async (req, res) => {
  if (typeof req.params["orderId"] === "string") {
    await orderService.deleteOrderById(
      new mongoose.Types.ObjectId(req.params["orderId"])
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
});
//# sourceMappingURL=order.controller.js.map
