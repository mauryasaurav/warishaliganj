import { sendErrorResponse, sendSuccessResponse } from "../../modules/errors";
import * as service from "../../services/admin/banner";

export const getAllTaskController = async (req, res) => {
  try {
    const data = await service.listBanners({ ...req.query });
    sendSuccessResponse(res, "Banners fetched successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
