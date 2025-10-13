import { Router } from "express";
import { protect } from "../../../../middleware/auth.middleware";
import { getUsers } from "../../controllers/admin/user.controller";
import adminAuthRoute from "./auth.admin.route";
import adminFaqRoute from "./faqs.admin.route";
import adminContactUsRoute from "./contact-us.admin.route";
import adminBlogRoute from "./blogs.admin.route";

const adminRoutes: Router = Router();

adminRoutes.use("/auth", adminAuthRoute);

adminRoutes.use(protect("admin"));

adminRoutes.use("/faqs", adminFaqRoute);
adminRoutes.use("/contacts", adminContactUsRoute);
adminRoutes.use("/blogs", adminBlogRoute);

export default adminRoutes;
