import { sendErrorResponse, sendSuccessResponse } from "../../modules/errors";
import * as service from "../../services/admin/product";

export const getAllProductsController = async (req, res) => {
  try {
    const data = await service.listProducts({ ...req.query });
    sendSuccessResponse(res, "Products fetched successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
