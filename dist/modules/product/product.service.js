import httpStatus from "http-status";
import Order from "./order.model";
import ApiError from "../errors/ApiError";
/**
 * Create a order
 * @param {NewCreatedOrder} orderBody
 * @returns {Promise<IOrder>}
 */
export const createOrder = async (orderBody) => {
  return Order.create(orderBody);
};
/**
 * Register a order
 * @param {NewRegisteredOrder} orderBody
 * @returns {Promise<IOrder>}
 */
export const registerOrder = async (orderBody) => {
  return Order.create(orderBody);
};
/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};
/**
 * Get order by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IOrder | null>}
 */
export const getOrderById = async (id) => Order.findById(id);
/**
 * Get order by email
 * @param {string} email
 * @returns {Promise<IOrder | null>}
 */
export const getOrderByEmail = async (email) => Order.findOne({ email });
/**
 * Update order by id
 * @param {mongoose.Types.ObjectId} orderId
 * @param {UpdateOrderBody} updateBody
 * @returns {Promise<IOrder | null>}
 */
export const updateOrderById = async (orderId, updateBody) => {
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
export const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  await order.remove();
  return order;
};
//# sourceMappingURL=order.service.js.map
