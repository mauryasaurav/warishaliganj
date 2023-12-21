import UserModel from "../../models/user/user";
import {
  listAggregation,
  listAggregationWithoutUnblock,
} from "../../modules/mongo-query";

export const createUser = async (data) => {
  try {
    return await UserModel.create(data);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    await UserModel.findByIdAndUpdate(id, { $set: data });
    return getUser(id);
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    return await UserModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async ({ email }) => {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export const getUserByPhone = async ({ phoneNumber }) => {
  try {
    return await UserModel.findOne({ phoneNumber });
  } catch (error) {
    throw error;
  }
};

export const listUser = async (query) => {
  try {
    const result = await UserModel.aggregate(
      listAggregation({ ...query })
    );
    return {
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      users: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};

export const listUserWithoutBlock = async (query) => {
  try {
    const result = await UserModel.aggregate(
      listAggregationWithoutUnblock(query)
    );
    return {
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      banners: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};
