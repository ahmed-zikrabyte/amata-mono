import { Router } from "express";
import AdminContactUsController from "../../controllers/admin/contact-us.admin.controller";

const adminContactUsRoute: Router = Router();
const adminContactUsController = new AdminContactUsController();

adminContactUsRoute.get("/", adminContactUsController.getContacts);

export default adminContactUsRoute;
