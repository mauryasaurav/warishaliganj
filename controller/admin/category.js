import { isValidObjectId } from "mongoose";
import { sendErrorResponse, sendSuccessResponse } from "../../modules/errors";
import * as service from "../../services/admin/category";

export const getAllCategoryController = async (req, res) => {
  try {
    const data = await service.listCategoryWithoutBlock(req.query);
    sendSuccessResponse(res, "Categorys fetched successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return sendErrorResponse(res, "Id is invalid", 400);
    }

    const data = await service.updateCategory(req.params.id, req.body);
    sendSuccessResponse(res, "Category updated successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return sendErrorResponse(res, "Id is invalid", 400);
    }

    const data = await service.updateCategory(req.params.id, { isDeleted: true });
    sendSuccessResponse(res, "Category deleted successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const addCategoryController = async (req, res) => {
  try {
    const data = await service.createCategory(req.body);
    sendSuccessResponse(res, "Category created successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};