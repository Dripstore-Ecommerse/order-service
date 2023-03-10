import express, { Router } from "express";
import { validate } from "../../modules/validate";
import { orderController, orderValidation } from "../../modules/order";

const router: Router = express.Router();

router
  .route("/")
  .post(validate(orderValidation.createOrder), orderController.createOrder)
  .get(validate(orderValidation.getOrders), orderController.getOrders);

router
  .route("/:orderId")
  .get(validate(orderValidation.getOrder), orderController.getOrder)
  .patch(validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete(validate(orderValidation.deleteOrder), orderController.deleteOrder);

export default router;
