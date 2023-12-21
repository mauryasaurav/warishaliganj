import { isValidObjectId } from "mongoose";
import { sendErrorResponse, sendSuccessResponse } from "../../modules/errors";
import * as service from "../../services/admin/banner";

export const getAllBannersController = async (req, res) => {
  try {
    const data = await service.listBannerWithoutBlock(req.query);
    sendSuccessResponse(res, "Banners fetched successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const updateBannerController = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return sendErrorResponse(res, "Id is invalid", 400);
    }

    const data = await service.updateBanner(req.params.id, req.body);
    sendSuccessResponse(res, "Banner updated successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const deleteBannerController = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return sendErrorResponse(res, "Id is invalid", 400);
    }

    const data = await service.updateBanner(req.params.id, { isDeleted: true });
    sendSuccessResponse(res, "Banner deleted successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const addBannerController = async (req, res) => {
  try {
    const data = await service.createBanner(req.body);
    sendSuccessResponse(res, "Banner created successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};