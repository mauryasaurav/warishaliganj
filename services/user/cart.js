import UserCartModel from "../../models/user/cart";
import { listAggregation } from "../../modules/mongo-query";

export const createCart = async (data) => {
  try {
    return await UserCartModel.create(data);
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (id, data) => {
  try {
    await UserCartModel.findByIdAndUpdate(id, { $set: data });
    return getCart(id);
  } catch (error) {
    throw error;
  }
};

export const getCart = async (id) => {
  try {
    return await UserCartModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const listCart = async (query) => {
  try {
    const result = await UserCartModel.aggregate(listAggregation({ ...query }));
    return {
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      users: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};
