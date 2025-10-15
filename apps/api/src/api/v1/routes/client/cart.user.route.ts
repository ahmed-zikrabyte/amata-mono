import { Router } from "express";
import UserCartController from "../../controllers/client/cart.user.controller";

const userCartRoute: Router = Router();
const userCartController = new UserCartController();

userCartRoute.get("/", userCartController.getCart);
userCartRoute.post("/add-to-cart", userCartController.addToCart);
userCartRoute.put("/update-cart", userCartController.updateCartQuantity);
userCartRoute.delete("/remove", userCartController.removeFromCart);

export default userCartRoute;
