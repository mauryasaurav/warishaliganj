import { generateToken } from "../../middlewares/authentication.js";
import {
  comparePassword,
  generatePassword,
} from "../../modules/commonFunction.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../modules/errors.js";
import * as adminService from "../../services/admin/user.js";

export const createAccountController = async (req, res) => {
  try {
    const alreadyExist = await adminService.getAdminUserByEmail(req.body);
    if (!!alreadyExist) {
      sendErrorResponse(res, "Email already exist", 400);
      return;
    }

    req.body.password = await generatePassword(req.body.password);
    await adminService.createAdminUser(req.body);
    sendSuccessResponse(res, "User created successfully, please login");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const adminUserResp = await adminService.getAdminUserByEmail(req.body);
    if (!adminUserResp) {
      sendErrorResponse(res, "Email do not exist", 404);
      return;
    }

    const verifyPassword = await comparePassword(
      adminUserResp.password,
      req.body.password
    );

    if (!verifyPassword) {
      sendErrorResponse(res, "Password is invlaid", 400);
    }

    let accessToken = generateToken({
      email: adminUserResp.email,
      fullName: adminUserResp.fullName,
      _id: adminUserResp._id,
    });
    
    sendSuccessResponse(res, "Login successfully", {
      ...adminUserResp._doc,
      accessToken,
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const uploadAdminFileController = async (req, res) => {
  try {
    if (!req.files.uploadAdminFile) {
      req.body.uploadAdminFile = req.files.uploadAdminFile[0].location || "";
    }
    sendSuccessResponse(
      res,
      "Upload image successfully",
      req.body.uploadAdminFile
    );
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
