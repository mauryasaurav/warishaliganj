import jwt from "jsonwebtoken";
import { config } from "../config/config";
import AdminUserModel from "../models/admin/user";
import { verifyToken } from "../modules/helpers";
import { getUserByEmail } from "../services/user/user";

export const verifyUserToken = async (req, res, next) => {
  let { accesstoken } = req.headers;
  if (!accesstoken)
    return res.status(401).send({
      auth: false,
      message: "No token Provided",
    });
  jwt.verify(
    accesstoken,
    config.JWT_PRIVATE_KEY,
    async function (err, decoded) {
      if (!err) {
        req.tokenData = decoded;
        let user = await findUser(accesstoken);
        if (user.status == 1) {
          req.userData = user.data;
        }
        next();
      } else {
        return res
          .status(401)
          .json({ auth: false, message: "Token has been expired" });
      }
    }
  );
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

  let adminResp = await getUserByEmail(exractToken);
  if (!adminResp) {
    res.status(401).json({ message: "Invalid Access Token" });
    return;
  }

  if (adminResp.isBlocked || adminResp.isDeleted) {
    res
      .status(401)
      .json({ message: "Your account has been blocked or either deleted" });
    return;
  }

  req.user = adminResp;
  next();
};

export const generateToken = (payload) => {
  // let token = jwt.sign({ access: 'access-' }, config.JWT_PRIVATE_KEY, { expiresIn: '2 days' });
  let token = jwt.sign(payload, config.JWT_PRIVATE_KEY, {
    expiresIn: "2 days",
  });
  return token;
};

async function findUser(accesstoken) {
  try {
    let user = await UserModel.findOne({ accessToken: accesstoken });
    // console.log(user, "rfgthyjukilo;fdghjkl;")
    if (!user) {
      return {
        status: 0,
        data: {},
      };
    }
    return {
      status: 1,
      data: user,
    };
  } catch (error) {
    return {
      status: 0,
      error: error,
    };
  }
}
//Admin Token
async function findAdmin(accesstoken) {
  try {
    let user = await AdminUserModel.findOne({ accessToken: accesstoken });
    if (!user) {
      return {
        status: 0,
        data: {},
      };
    }
    return {
      status: 1,
      data: user,
    };
  } catch (error) {
    return {
      status: 0,
      error: error,
    };
  }
}

export const verifyUserLogin = async (req, res, next) => {
  if (req.userData) {
    next();
  } else {
    return res
      .status(401)
      .json({ auth: false, message: "Unauthorized user/User not Loged in" });
  }
};
