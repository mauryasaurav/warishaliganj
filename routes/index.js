import { Router } from "express";
import { checkLogin } from "../modules/commonFunction";
import adminRoute from "./admin";
import userRoute from "./user";

const router = Router();
router.use("/v1/user", checkLogin, userRoute);
router.use("/v1/admin", checkLogin, adminRoute);

export default router;
