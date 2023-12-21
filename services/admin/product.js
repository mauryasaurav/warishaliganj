import AdminProductModel from "../../models/admin/product";
import { listAggregation, listAggregationWithoutUnblock } from "../../modules/mongo-query";

export const listProducts = async (query) => {
  try {
    const result = await AdminProductModel.aggregate(listAggregation({ ...query }));
    return {
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      products: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};

export const listProductWithoutBlock = async (query) => {
  try {
    const result = await AdminProductModel.aggregate(
      listAggregationWithoutUnblock(query)
    );
    return {      
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      products: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    return await AdminProductModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    await AdminProductModel.findByIdAndUpdate(id, { $set: data });
    return getProduct(id);
  } catch (error) {
    throw error;
  }
};
      
export const createProduct = async (data) => {
  try {
    return await AdminProductModel.create(data);
  } catch (error) {
    throw error;
  }
};
