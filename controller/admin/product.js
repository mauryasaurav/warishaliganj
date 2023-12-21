import { isValidObjectId } from "mongoose";
import { sendErrorResponse, sendSuccessResponse } from "../../modules/errors";
import * as service from "../../services/admin/product";
import { getCategory } from "../../services/admin/category";
import { calculateProductPercentage } from "../../modules/helpers";

export const getAllProductController = async (req, res) => {
  try {
    const data = await service.listProductWithoutBlock(req.query);
    sendSuccessResponse(res, "Products fetched successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const updateProductController = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return sendErrorResponse(res, "Id is invalid", 400);
    }

    const validCategory = await getCategory(req.body.category);
    if (!validCategory) {
      sendErrorResponse(res, "Category is invalid", 400);
      return;
    }

    const discountPercentage = calculateProductPercentage(req.body);
    const data = await service.updateProduct(req.params.id, {
      ...req.body,
      originalAmount: req.body.originalAmount.toFixed(2),
      discountAmount: req.body.discountAmount.toFixed(2),
      discountPercentage,
    });

    sendSuccessResponse(res, "Product updated successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const deleteProductController = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return sendErrorResponse(res, "Id is invalid", 400);
    }

    const data = await service.updateProduct(req.params.id, {
      isDeleted: true,
    });
    sendSuccessResponse(res, "Product deleted successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const addProductController = async (req, res) => {
  try {
    const validCategory = await getCategory(req.body.category);
    if (!validCategory) {
      sendErrorResponse(res, "Category is invalid", 400);
      return;
    }

    const discountPercentage = calculateProductPercentage(req.body);
    const data = await service.createProduct({
      ...req.body,
      originalAmount: req.body.originalAmount.toFixed(2),
      discountAmount: req.body.discountAmount.toFixed(2),
      discountPercentage,
    });

    sendSuccessResponse(res, "Product created successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
