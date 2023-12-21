import CatagoryModel from "../../models/admin/catagory";
import { listAggregation, listAggregationWithoutUnblock } from "../../modules/mongo-query";

export const listCatogeries = async (query) => {
  try {
    const result = await CatagoryModel.aggregate(listAggregation({ ...query }));
    return {
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      categories: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};

export const listCategoryWithoutBlock = async (query) => {
  try {
    const result = await CatagoryModel.aggregate(
      listAggregationWithoutUnblock(query)
    );
    return {      
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      categories: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};

export const getCategory = async (id) => {
  try {
    return await CatagoryModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    await CatagoryModel.findByIdAndUpdate(id, { $set: data });
    return getCategory(id);
  } catch (error) {
    throw error;
  }
};
      
export const createCategory = async (data) => {
  try {
    return await CatagoryModel.create(data);
  } catch (error) {
    throw error;
  }
};
