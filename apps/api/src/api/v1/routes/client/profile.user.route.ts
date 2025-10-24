import { Router } from "express";
import UserProfileController from "../../controllers/client/profile.user.controller";

const userProfileRoute: Router = Router();
const userProfileController = new UserProfileController();

userProfileRoute.get("/", userProfileController.getUserData);

export default userProfileRoute;
