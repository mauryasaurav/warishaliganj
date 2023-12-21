import { generateToken } from "../../middlewares/authentication.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../modules/errors.js";
import * as userService from "../../services/user/user.js";
import { verifyToken } from "../../modules/helpers.js";

export const createAccountController = async (req, res) => {
  try {
    const alreadyExist = await userService.getUserByPhone(req.body);
    if (!!alreadyExist) {
      sendErrorResponse(res, "Phone already exist", 400);
      return;
    }

    await userService.createUser(req.body);
    let accessToken = generateToken({ phoneNumber: alreadyExist.phoneNumber });
    sendSuccessResponse(res, "OTP sent successfully", {
      otp: 1234,
      accessToken,
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const userResp = await userService.getUserByPhone(req.body);
    if (!userResp) {
      sendErrorResponse(res, "Phone Number do not exist", 404);
      return;
    }

    let accessToken = generateToken({ phoneNumber: userResp.phoneNumber });
    sendSuccessResponse(res, "OTP sent successfully", {
      otp: 1234,
      accessToken,
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const exractToken = verifyToken(req.body.accessToken);
    if (!exractToken) {
      sendErrorResponse(res, "Token is invalid or either expired");
      return;
    }

    console.log(exractToken.phoneNumber);
    const userResp = await userService.getUserByPhone({
      phoneNumber: exractToken.phoneNumber,
    });
    if (!userResp) {
      sendErrorResponse(
        res,
        "Invlaid phone number in attached token, please try to login again"
      );
      return;
    }

    if (userResp.otp != req.body.otp) {
      sendErrorResponse(res, "otp is invalid");
      return;
    }

    let accessToken = generateToken({
      user: {
        fullName: userResp.fullName,
        phoneNumber: userResp.phoneNumber,
        _id: userResp._id,
        email: userResp.email,
      },
    });

    sendSuccessResponse(res, "User logged successfully", {
      ...userResp._doc,
      accessToken,
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const completeProfileController = async (req, res) => {
  try {
    let userData = await userService.completeProfile(req);
    if (userData.status == -1) {
      throw new Error(userData.message);
    } else if (userData.status == 0) {
      return res
        .status(403)
        .json({ success: false, message: userData.message, data: {} });
    } else {
      res.status(200).json({
        success: true,
        message: userData.message,
        data: userData.data,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

export const resendOtpController = async (req, res) => {
  try {
    const exractToken = verifyToken(req.body.accessToken);
    if (!exractToken) {
      sendErrorResponse(res, "Token is invalid or either expired");
      return;
    }

    let accessToken = generateToken({ phoneNumber: exractToken.phoneNumber });
    sendSuccessResponse(res, "OTP sent successfully", {
      otp: 1234,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

export const uploadUserFileController = async (req, res) => {
  try {
    if (!req.files.uploadUserFile) {
      req.body.uploadUserFile = req.files.uploadUserFile[0].location || "";
    }
    sendSuccessResponse(
      res,
      "Upload image successfully",
      req.body.uploadUserFile
    );
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const socialSignupController = async (req, res) => {
  try {
    let userData = await userService.socialSignup(req);
    if (userData.status == -1) {
      throw new Error(userData.message);
    } else if (userData.status == 0) {
      return res
        .status(403)
        .json({ success: false, message: userData.message, data: {} });
    } else {
      res.status(201).json({
        success: true,
        message: userData.message,
        data: userData.data,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};