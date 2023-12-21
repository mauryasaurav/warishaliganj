import { sendErrorResponse, sendSuccessResponse } from "../../modules/errors";
import { getProduct } from "../../services/admin/product";
import * as service from "../../services/user/cart";

export const createCartController = async (req, res) => {
  try {

    const { productId } = req.params;
    if (!isValidObjectId(productId)) {
      return sendErrorResponse(res, "Id is invalid", 400);
    }
    const productResp = await getProduct(productId)
    if(!productResp) {
      return sendErrorResponse(res, "Product Id is Invalid", 400);
    }

    const cartData = {
      quantity: 1,
      amount: productResp.discountAmount,
      product: productResp._id,
      user: req.user._id 
    }

    const data = await service.createCart(cartData);
    sendSuccessResponse(res, "Cart created successfully", data);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
