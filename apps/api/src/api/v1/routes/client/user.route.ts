import { Router } from "express";
import userAuthRoute from "./auth.user.route";
import { protect } from "../../../../middleware/auth.middleware";
import userProductRoute from "./product.user.route";
import userCartRoute from "./cart.user.route";
import userAddressRoute from "./address.user.route";
import userOrderRoute from "./order.user.route";
import userProfileRoute from "./profile.user.route";
import userCategoryRoute from "./category.user.route";
import userCheckoutRoute from "./checkout.user.route";

const userRoutes: Router = Router();

userRoutes.use("/auth", userAuthRoute);
userRoutes.use("/products", userProductRoute);
userRoutes.use("/category", userCategoryRoute);

userRoutes.use(protect("client"));

userRoutes.use("/cart", userCartRoute);
userRoutes.use("/address", userAddressRoute);
userRoutes.use("/order", userOrderRoute);
userRoutes.use("/profile", userProfileRoute);
userRoutes.use("/checkout", userCheckoutRoute);

export default userRoutes;
