import { Router } from "express";
import AdminBlogController from "../../controllers/admin/blogs.admin.controller";

const adminBlogRoute: Router = Router();
const adminBlogController = new AdminBlogController();

adminBlogRoute.get("/", adminBlogController.getAll);
adminBlogRoute.get("/:id", adminBlogController.getOne);
adminBlogRoute.post("/create", adminBlogController.createBlog);
adminBlogRoute.put("/edit/:id", adminBlogController.updateBlog);

export default adminBlogRoute;
