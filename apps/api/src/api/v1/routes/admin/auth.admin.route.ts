import { Router } from "express";
import AdminAuthController from "../../controllers/admin/auth.admin.controller";

const adminAuthRoute: Router = Router();
const adminAuthController = new AdminAuthController();

adminAuthRoute.post("/login", adminAuthController.loginAdmin);
adminAuthRoute.post("/register", adminAuthController.registerAdmin);


export default adminAuthRoute;
