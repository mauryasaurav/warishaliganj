import { isValidObjectId } from "mongoose";
import { sendErrorResponse, sendSuccessResponse } from "../../modules/errors";
import * as service from "../../services/user/user";

export const getAllUserController = async (req, res) => {
  try {
    const data = await service.listUserWithoutBlock(req.query);
    sendSuccessResponse(res, "Users fetched successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const updateUserController = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return sendErrorResponse(res, "Id is invalid", 400);
    }

    const data = await service.updateUser(req.params.id, req.body);
    sendSuccessResponse(res, "User updated successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const deleteUserController = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return sendErrorResponse(res, "Id is invalid", 400);
    }

    const data = await service.updateUser(req.params.id, { isDeleted: true });
    sendSuccessResponse(res, "User deleted successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
