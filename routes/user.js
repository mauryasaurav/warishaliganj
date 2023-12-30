import { Router } from "express";
import { celebrate } from "celebrate";
import { verifyUserToken } from "../middlewares/authentication";
import user from "../validation/user.validation";
import { uploadAdminFile } from "../modules/aws-s3";
import * as auth from "../controller/user/auth";
import * as banner from "../controller/user/banner";
import * as category from "../controller/user/category";
import * as product from "../controller/user/products";
import * as users from "../controller/user/users";

const router = Router()

// // Upload APIs
router.route("/uploadFile").post(uploadAdminFile, auth.uploadUserFileController);

// Auth APIs
router.route("/auth/register").post(celebrate({ body: user.CREATE_ACCOUNT }), auth.createAccountController);
router.route("/auth/login").post(celebrate({ body: user.LOGIN }), auth.loginController)
router.route("/auth/verifyOtp").post(celebrate({ body: user.VERIFY_OTP }), auth.verifyOtpController)
router.route("/auth/resendOtp").post(celebrate({ body: user.RESEND_OTP }), auth.resendOtpController)

// Categories APIs
router.route("/categories").get(verifyUserToken, category.getAllCategoryController);

// Banners APIs
router.route("/banners").get(verifyUserToken, banner.getAllTaskController);

// Banners APIs
router.route("/products").get(verifyUserToken, product.getAllProductsController);

router.route("/users/me").get(verifyUserToken, users.getUserDetailController)

export default router;
