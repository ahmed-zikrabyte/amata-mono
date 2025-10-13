import {Router} from "express";
import {protect} from "../../../../middleware/auth.middleware";
import {getProfile} from "../../controllers/client/profile.controller";

const router: Router = Router();
router.get("/", getProfile);

router.use(protect("client"));


export default router;
