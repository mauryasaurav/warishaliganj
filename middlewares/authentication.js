import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { verifyToken } from "../modules/helpers";
import { getUserByEmail, getUserByPhone } from "../services/user/user";
import { getAdminUserByEmail } from "../services/admin/user";

export const verifyUserToken = async (req, res, next) => {
  let { accesstoken } = req.headers;
  if (!accesstoken)
    return res.status(401).send({
      auth: false,
      message: "Please provide access token.",
    });

  const exractToken = verifyToken(accesstoken);
  if (!exractToken) {
    return res.status(401).send({
      auth: false,
      message: "Token has been expired or invalid.",
    });
  }

  let userResp = await getUserByPhone(exractToken);
  if (!userResp) {
    res.status(401).json({ message: "Invalid Access Token" });
    return;
  }

  if (userResp.isBlocked || userResp.isDeleted) {
    res
      .status(401)
      .json({ message: "Your account has been blocked or either deleted" });
    return;
  }

  req.user = userResp;
  next();
};

export const verifyAdminToken = async (req, res, next) => {
  let { accesstoken } = req.headers;
  if (!accesstoken)
    return res.status(401).send({
      auth: false,
      message: "Token has been expired",
    });

  const exractToken = verifyToken(accesstoken);
  if (!exractToken) {
    return res.status(401).send({
      auth: false,
      message: "Token has been expired or invalid",
    });
  }

  let adminResp = await getAdminUserByEmail(exractToken);
  if (!adminResp) {
    res.status(401).json({ message: "Invalid Access Token" });
    return;
  }

  if (adminResp.isBlocked) {
    res
      .status(401)
      .json({ message: "Your account has been blocked or either deleted" });
    return;
  }

  req.user = adminResp;
  next();
};

export const generateToken = (payload) => {
  let token = jwt.sign(payload, config.JWT_PRIVATE_KEY, {
    expiresIn: "2 days",
  });
  return token;
};

export const verifyUserLogin = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res
      .status(401)
      .json({ auth: false, message: "Unauthorized user/User not Loged in" });
  }
};
