import {Router} from "express";
import adminRoutes from "./routes/admin/admin.route";
import userRoutes from "./routes/client/user.route";

const mainRouter: Router = Router();

mainRouter.use('/admin', adminRoutes)
mainRouter.use('/user', userRoutes)



export default mainRouter;
