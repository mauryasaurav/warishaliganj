import { sendErrorResponse, sendSuccessResponse } from "../../modules/errors";
import * as service from "../../services/admin/category";

export const getAllCategoryController = async (req, res) => {
  try {
    const data = await service.listCatogeries({ ...req.query });
    sendSuccessResponse(res, "Catogeries fetched successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
