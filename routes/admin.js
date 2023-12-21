import { Router } from "express";
import { celebrate } from "celebrate";
import admin from "../validation/admin.validation";
import  * as auth from "../controller/admin/auth";
import  * as user from "../controller/admin/user";
import  * as banner from "../controller/admin/banner";
import  * as category from "../controller/admin/category";
import  * as product from "../controller/admin/product";

import { uploadAdminFile } from "../modules/aws-s3";
import { verifyAdminToken } from "../middlewares/authentication";


const router = Router();

// Upload APIs
router.route("/uploadFile").post(uploadAdminFile, auth.uploadAdminFileController);


// Auth APIs
router.route("/auth/register").post(celebrate({ body: admin.CREATE_ACCOUNT }), auth.createAccountController);
router.route("/auth/login").post(celebrate({ body: admin.LOGIN }), auth.loginController)

// Users APIs
router.route("/users").get(verifyAdminToken, user.getAllUserController);
router.route("/users/:id").patch(celebrate({ body: admin.UPDATE_USER }), verifyAdminToken, user.updateUserController)
router.route("/users/:id").delete(verifyAdminToken, user.deleteUserController);

// Banners APIs
router.route("/banners").get(verifyAdminToken, banner.getAllBannersController);
router.route("/banners") .post(celebrate({ body: admin.ADD_BANNER }), verifyAdminToken, banner.addBannerController)
router.route("/banners/:id").patch(celebrate({ body: admin.EDIT_BANNER }), verifyAdminToken, banner.updateBannerController)
router.route("/banners/:id").delete(verifyAdminToken, banner.deleteBannerController);

// Categories APIs
router.route("/categories").post(celebrate({ body: admin.ADD_CATAGORY }), verifyAdminToken, category.addCategoryController)
router.route("/categories/:id").patch(celebrate({ body: admin.EDIT_CATAGORY }), verifyAdminToken, category.updateCategoryController)
router.route("/categories").get(verifyAdminToken, category.getAllCategoryController);
router.route("/categories/:id").delete(verifyAdminToken, category.deleteCategoryController);


// Categories APIs
router.route("/products").post(celebrate({ body: admin.CREATE_PRODUCT }), verifyAdminToken, product.addProductController)
router.route("/products/:id").patch(celebrate({ body: admin.EDIT_PRODUCT }), verifyAdminToken, product.updateProductController)
router.route("/products").get(verifyAdminToken, product.getAllProductController);
router.route("/products/:id").delete(verifyAdminToken, product.deleteProductController);

export default router;
