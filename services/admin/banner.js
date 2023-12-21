import BannerModel from "../../models/admin/banner";
import { listAggregation, listAggregationWithoutUnblock } from "../../modules/mongo-query";

export const listBanners = async (query) => {
  try {
    const result = await BannerModel.aggregate(listAggregation({ ...query }));
    return {
      page: result[0]?.total[0]?.pages || 1,
      total: result[0]?.total[0]?.total || 1,
      banners: result[0]?.data,
    };
  } catch (error) {
    throw error;
  }
};

export const listBannerWithoutBlock = async (query) => {
  try {
    const result = await BannerModel.aggregate(
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

export const getBanner = async (id) => {
  try {
    return await BannerModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const updateBanner = async (id, data) => {
  try {
    await BannerModel.findByIdAndUpdate(id, { $set: data });
    return getBanner(id);
  } catch (error) {
    throw error;
  }
};

export const createBanner = async (data) => {
  try {
    return await BannerModel.create(data);
  } catch (error) {
    throw error;
  }
};
