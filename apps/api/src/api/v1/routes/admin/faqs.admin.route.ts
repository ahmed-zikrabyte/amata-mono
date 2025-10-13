import { Router } from "express";
import AdminFaqController from "../../controllers/admin/faqs.admin.controller";

const adminFaqRoute: Router = Router();
const adminFaqController = new AdminFaqController();

adminFaqRoute.get("/", adminFaqController.getAll);
adminFaqRoute.get("/:id", adminFaqController.getOneFaq);
adminFaqRoute.post("/create", adminFaqController.createFaq);
adminFaqRoute.put("/update/:id", adminFaqController.updateFaq);
adminFaqRoute.patch("/toggle-status/:id", adminFaqController.toggleStatus);
adminFaqRoute.delete("/delete/:id", adminFaqController.deleteFaq);

export default adminFaqRoute;
