import { Router } from "express";
import UserOrderController from "../../controllers/client/order.user.controller";

const userOrderRoute: Router = Router();
const userOrderController = new UserOrderController();

userOrderRoute.post("/create-order", userOrderController.createOrder);
userOrderRoute.post("/verify-payment", userOrderController.verifyPayment);
userOrderRoute.get("/", userOrderController.getAllOrders);
userOrderRoute.get("/:orderId", userOrderController.getOrderDetails);

export default userOrderRoute;
