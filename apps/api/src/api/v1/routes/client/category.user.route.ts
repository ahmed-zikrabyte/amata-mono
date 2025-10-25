import { Router } from "express";
import UserCategoryController from "../../controllers/client/category.user.controller";

const userCategoryController = new UserCategoryController();

const userCategoryRoute: Router = Router();

userCategoryRoute.get("/", userCategoryController.getAllCategories);

export default userCategoryRoute;
