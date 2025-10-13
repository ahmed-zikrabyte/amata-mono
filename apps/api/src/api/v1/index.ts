import {Router} from "express";
import authRouter from './routes/public/auth.route';
import userRouter from './routes/admin/admin.route';
import profileRouter from './routes/client/profile.route';
import adminRoutes from "./routes/admin/admin.route";

const mainRouter: Router = Router();

// mainRouter.use('/auth', authRouter);
mainRouter.use('/admin', adminRoutes)
// mainRouter.use('/admin/users', userRouter);
mainRouter.use('/client/profile', profileRouter);

export default mainRouter;
