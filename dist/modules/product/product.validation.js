import Joi from "joi";
import { objectId } from "../validate/custom.validation";
const createOrderBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
};
export const createOrder = {
  body: Joi.object().keys(createOrderBody),
};
export const getOrders = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
export const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};
export const updateOrder = {};
export const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};
//# sourceMappingURL=order.validation.js.map
