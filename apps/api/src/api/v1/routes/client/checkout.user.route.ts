import { Router } from "express";
import UserCheckoutController from "../../controllers/client/checkout.user.controller";

const userCheckoutRoute: Router = Router();
const userCheckoutController = new UserCheckoutController();

userCheckoutRoute.get("/", userCheckoutController.getCheckout);

export default userCheckoutRoute;
