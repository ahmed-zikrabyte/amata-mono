import { Router } from "express";
import AdminProductController from "../../controllers/admin/products.admin.controller";
import upload from "../../../../utils/multer.util";

const adminProductRoute: Router = Router();
const adminProductController = new AdminProductController();

adminProductRoute.get("/", adminProductController.getAllProducts);
adminProductRoute.get("/:slug", adminProductController.getProduct);
adminProductRoute.post("/create", upload.array('images'), adminProductController.createProduct);
adminProductRoute.put("/edit/:slug", upload.array('images'), adminProductController.updateProduct);
adminProductRoute.patch(
  "/toggle-status/:slug",
  adminProductController.toggleProductStatus
);
adminProductRoute.delete("/delete/:slug", adminProductController.deleteProduct);

export default adminProductRoute;
