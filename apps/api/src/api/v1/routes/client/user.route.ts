import { Router } from "express";
import userAuthRoute from "./auth.user.route";
import { protect } from "../../../../middleware/auth.middleware";

const userRoutes: Router = Router();

userRoutes.use("/auth", userAuthRoute);

userRoutes.use(protect("client"));

export default userRoutes;
