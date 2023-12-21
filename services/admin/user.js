import AdminUserModel from "../../models/admin/user";
import {
  listAggregation,
  listAggregationWithoutUnblock,
} from "../../modules/mongo-query";

export const createAdminUser = async (data) => {
  try {
    return await AdminUserModel.create(data);
  } catch (error) {
    throw error;
  }
};

export const updateAdminUser = async (id, data) => {
  try {
    await AdminUserModel.findByIdAndUpdate(id, { $set: data });
    return getAdminUser(id);
  } catch (error) {
    throw error;
  }
};

export const getAdminUser = async (id) => {
  try {
    return await AdminUserModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const getAdminUserByEmail = async ({ email }) => {
  try {
    return await AdminUserModel.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export const listUserAdminUser = async (query) => {
  try {
    const result = await AdminUserModel.aggregate(
      listAggregation({ ...query })
    );
    return {
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      subscriptions: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};

export const listAdminAdminUser = async (query) => {
  try {
    const result = await AdminUserModel.aggregate(
      listAggregationWithoutUnblock(query)
    );
    return {
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      subscriptions: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};
