import { Router } from "express";
import AdminOrderController from "../../controllers/admin/orders.admin.controller";

const adminOrderRoute: Router = Router();
const adminOrderController = new AdminOrderController();

adminOrderRoute.get("/", adminOrderController.getAllOrders);
adminOrderRoute.get("/:orderId", adminOrderController.getOneOrder);

export default adminOrderRoute;
