import { sendErrorResponse, sendSuccessResponse } from "../../modules/errors";
import * as service from "../../services/user/user";

export const getUserDetailController = async (req, res) => {
  try {
    console.log("userRespddssdsd", req.user)
    const userResp = await service.getUserByPhone(req.user);
    console.log("userResp", userResp)
    if (!userResp) {
      sendErrorResponse(res, "Phone Number do not exist", 401);
      return;
    }

    console.log("userResp", userResp)
    let { accesstoken } = req.headers;
    sendSuccessResponse(res, "User fetched successfully", {
      ...userResp._doc,
      accessToken: accesstoken,
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
