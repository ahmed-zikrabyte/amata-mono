import { Router } from "express";
import userAuthRoute from "./auth.user.route";
import { protect } from "../../../../middleware/auth.middleware";
import userProductRoute from "./product.user.route";
import userCartRoute from "./cart.user.route";
import userAddressRoute from "./address.user.route";

const userRoutes: Router = Router();

userRoutes.use("/auth", userAuthRoute);
userRoutes.use("/products", userProductRoute);

userRoutes.use(protect("client"));

userRoutes.use("/cart", userCartRoute);
userRoutes.use("/address", userAddressRoute);

export default userRoutes;
