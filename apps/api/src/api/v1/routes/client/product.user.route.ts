import { Router } from "express";
import UserProductController from "../../controllers/client/product.user.conrtoller";

const userProductRoute: Router = Router();
const userProductController = new UserProductController();

userProductRoute.get("/", userProductController.getAllProducts);
userProductRoute.get("/:slug", userProductController.getOneProduct);

export default userProductRoute;
