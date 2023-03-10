import express from "express";
import orderRoute from "./orders.route";
const router = express.Router();
const defaultIRoute = [
  {
    path: "/orders",
    route: orderRoute,
  },
];
defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
//# sourceMappingURL=index.js.map
