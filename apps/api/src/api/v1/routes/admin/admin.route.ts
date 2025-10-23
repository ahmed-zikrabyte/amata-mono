import { Router } from "express";
import { protect } from "../../../../middleware/auth.middleware";
import adminAuthRoute from "./auth.admin.route";
import adminFaqRoute from "./faqs.admin.route";
import adminContactUsRoute from "./contact-us.admin.route";
import adminBlogRoute from "./blogs.admin.route";
import adminCategoryRoute from "./category.admin.route";
import adminProductRoute from "./products.admin.route";
import adminConfigRoute from "./config.admin.route";
import adminOrderRoute from "./order.admin.route";

const adminRoutes: Router = Router();

adminRoutes.use("/auth", adminAuthRoute);

adminRoutes.use(protect("admin"));

adminRoutes.use("/faqs", adminFaqRoute);
adminRoutes.use("/contacts", adminContactUsRoute);
adminRoutes.use("/blogs", adminBlogRoute);
adminRoutes.use("/categories", adminCategoryRoute);
adminRoutes.use("/products", adminProductRoute);
adminRoutes.use("/config", adminConfigRoute);
adminRoutes.use("/orders", adminOrderRoute);

export default adminRoutes;
