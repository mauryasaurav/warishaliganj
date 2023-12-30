import { Joi } from "celebrate";

let user = {
  CREATE_ACCOUNT: Joi.object().keys({
    countryCode: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    deviceType: Joi.string().required(),
    deviceToken: Joi.string().required(),
    fullName: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }),
  LOGIN: Joi.object().keys({
    phoneNumber: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
    deviceToken: Joi.string().required(),
  }),
  VERIFY_OTP: Joi.object().keys({
    otp: Joi.number().required(),
    accessToken: Joi.string().required(),
  }),
  RESEND_OTP: Joi.object().keys({
    accessToken: Joi.string().required(),
  }),
  RESET_PASSWORD: Joi.object().keys({
    password: Joi.string().required(),
  }),
  RESET_SECONDARY_PIN: Joi.object().keys({
    id: Joi.string().required(),
    secondry_pin: Joi.string().required(),
  }),
  ADD_TASK: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().required(),
    duration: Joi.string().required(),
    date: Joi.number().allow("", null),
    isVerified: Joi.bool(),
    priceType: Joi.string().required(),
    images: Joi.array(),
    asap: Joi.bool(),
    ratings: Joi.array().allow(null),
    category: Joi.string().required(),
    location: Joi.object().keys({
      address: Joi.string().allow("", null),
      coordinates:  Joi.array(),
    }),
  }),
  EDIT_TASK: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    amount: Joi.number(),
    duration: Joi.string(),
    date: Joi.number().allow("", null),
    ratings: Joi.array().allow(null),
    priceType: Joi.string(),
    images: Joi.array(),
    asap: Joi.bool(),
    isVerified: Joi.bool(),
    isBlocked: Joi.bool(),
    isActive: Joi.bool(),
    category: Joi.string(),
    location: Joi.object().keys({
      address: Joi.string(),
      coordinates:  Joi.array(),
    }),
  }),
};

export default user;
