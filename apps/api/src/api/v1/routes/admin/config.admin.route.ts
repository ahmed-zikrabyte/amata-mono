import { Router } from "express";
import AdminConfigController from "../../controllers/admin/config.admin.controller";

const adminConfigRoute: Router = Router();
const adminConfigController = new AdminConfigController();

adminConfigRoute.get("/", adminConfigController.getConfig);
adminConfigRoute.post("/create", adminConfigController.createConfig);
adminConfigRoute.put("/edit", adminConfigController.updateConfig);

export default adminConfigRoute;
