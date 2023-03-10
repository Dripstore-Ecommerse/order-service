import httpStatus from "http-status";
import mongoose from "mongoose";
import Order from "./order.model";
import ApiError from "../errors/ApiError";
import { IOptions, QueryResult } from "../paginate/paginate";
import {
  NewCreatedOrder,
  UpdateOrderBody,
  IOrder,
  NewRegisteredOrder,
} from "./order.interfaces";

/**
 * Create a order
 * @param {NewCreatedOrder} orderBody
 * @returns {Promise<IOrder>}
 */
export const createOrder = async (
  orderBody: NewCreatedOrder
): Promise<IOrder> => {
  return Order.create(orderBody);
};

/**
 * Register a order
 * @param {NewRegisteredOrder} orderBody
 * @returns {Promise<IOrder>}
 */
export const registerOrder = async (
  orderBody: NewRegisteredOrder
): Promise<IOrder> => {
  return Order.create(orderBody);
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryOrders = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

/**
 * Get order by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IOrder | null>}
 */
export const getOrderById = async (
  id: mongoose.Types.ObjectId
): Promise<IOrder | null> => Order.findById(id);

/**
 * Get order by email
 * @param {string} email
 * @returns {Promise<IOrder | null>}
 */
export const getOrderByEmail = async (email: string): Promise<IOrder | null> =>
  Order.findOne({ email });

/**
 * Update order by id
 * @param {mongoose.Types.ObjectId} orderId
 * @param {UpdateOrderBody} updateBody
 * @returns {Promise<IOrder | null>}
 */
export const updateOrderById = async (
  orderId: mongoose.Types.ObjectId,
  updateBody: UpdateOrderBody
): Promise<IOrder | null> => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete order by id
 * @param {mongoose.Types.ObjectId} orderId
 * @returns {Promise<IOrder | null>}
 */
export const deleteOrderById = async (
  orderId: mongoose.Types.ObjectId
): Promise<IOrder | null> => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  await order.remove();
  return order;
};
