import { Joi } from "celebrate";

let admin = {
  LOGIN: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  CREATE_ACCOUNT: Joi.object().keys({
    fullName: Joi.string().required(),
    countryCode: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    deviceToken: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }),
  VERIFY_OTP: Joi.object().keys({
    otp: Joi.number().required(),
  }),
  FORGOT_PASSWORD: Joi.object().keys({
    email: Joi.string().required(),
  }),
  ADD_BANNER: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    url: Joi.string().required(),
  }),
  EDIT_BANNER: Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    url: Joi.string(),
    isBlocked: Joi.bool(),
  }),
  BLOCK_UNBLOCK: Joi.object().keys({
    isBlocked: Joi.bool().required(),
  }),
  ADD_BENEFICIARY: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    contactNumber: Joi.number().required(),
    email: Joi.string().required(),
    profileImage: Joi.string().optional().allow(""),
  }),
  ADD_CATAGORY: Joi.object().keys({
    name: Joi.string().required(),
    icon: Joi.string().empty("").optional(),
  }),
  EDIT_CATAGORY: Joi.object().keys({
    name: Joi.string(),
    icon: Joi.string(),
    isBlocked: Joi.bool(),
  }),
  ADD_SUBSCRIPTION: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.string().required(),
    amount: Joi.number().required(),
    termsAndConditions: Joi.string().required(),
  }),
  EDIT_SUBSCRIPTION: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    duration: Joi.string(),
    amount: Joi.number(),
    termsAndConditions: Joi.string(),
    isBlocked: Joi.bool(),
  }),
  EDIT_TASK: Joi.object().keys({
    isBlocked: Joi.bool(),
  }),
  UPDATE_USER: Joi.object().keys({
    fullName: Joi.string().required(),
    countryCode: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    isBlocked: Joi.bool().required(),
    deviceType: Joi.number().required(),
    deviceToken: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }),
  CREATE_PRODUCT: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    originalAmount: Joi.number().required(),
    discountAmount: Joi.number().required(),
    brandName: Joi.string().required(),
    size: Joi.string().required(),
    category: Joi.string().required(),
    images: Joi.array().required(),
    isAvailable: Joi.bool().required(),
    isPopular: Joi.bool().required(),
  }),
  EDIT_PRODUCT: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    originalAmount: Joi.number(),
    discountAmount: Joi.number(),
    brandName: Joi.string(),
    size: Joi.string(),
    category: Joi.string(),
    images: Joi.array(),
    isAvailable: Joi.bool(),
    isDeleted: Joi.bool(),
    isBlocked: Joi.bool(),
    isPopular: Joi.bool(),
  }),
};

export default admin;