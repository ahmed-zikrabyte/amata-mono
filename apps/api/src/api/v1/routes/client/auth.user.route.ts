import { Router } from "express";
import UserAuthController from "../../controllers/client/auth.user.controller";

const userAuthRoute: Router = Router();
const userAuthController = new UserAuthController();

userAuthRoute.post("/register", userAuthController.register);
userAuthRoute.post("/register-verify", userAuthController.registerVerify);
userAuthRoute.post("/login", userAuthController.login);
userAuthRoute.post("/login-verify", userAuthController.loginVerify);

export default userAuthRoute;
