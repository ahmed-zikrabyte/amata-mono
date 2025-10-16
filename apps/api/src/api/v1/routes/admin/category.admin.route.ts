import { Router } from "express";
import AdminCategoryController from "../../controllers/admin/category.admin.controller";
import upload from "../../../../utils/multer.util";

const adminCategoryRoute: Router = Router();
const adminCategoryController = new AdminCategoryController();

adminCategoryRoute.get("/", adminCategoryController.getAllCategories);
adminCategoryRoute.get("/:slug", adminCategoryController.getCategory);
adminCategoryRoute.post("/create", upload.single('image'), adminCategoryController.createCategory);
adminCategoryRoute.put("/edit/:slug", upload.single("image"), adminCategoryController.updateCategory);
adminCategoryRoute.patch(
  "/toggle-status/:slug",
  adminCategoryController.toggleCategoryStatus
);
adminCategoryRoute.delete("/delete/:slug", adminCategoryController.deleteCategory);

export default adminCategoryRoute;
