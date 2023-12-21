import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: Number,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    countryCode: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "", //   1 for male 2 for female 3 for other
    },
    isMobileVerified: {
      type: Number,
      default: 0,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      default: "1234",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isGuestUser: {
      type: Boolean,
      default: false,
    },
    deviceType: {
      type: String,
      default: "Android"
    },
    deviceToken: {
      type: String,
      default: "",
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    accessToken: {
      type: String,
      default: null,
    },
    lastLogin: {
      type: Number,
      default: Date.now(),
    },
    createdAt: {
      type: Number,
      default: new Date().getTime(),
    },
    updatedAt: {
      type: Number,
      default: new Date().getTime(),
    },
    socialId: {
      type: String,
      default: "",
    },
    socialType: {
      type: Number, //1 = facebook, 2= google, 3= apple
      default: 0,
    },
    profileImage: {
      type: String,
      default: "",
    },
    socialActive: {
      type: Number,
      default: 0,
    },
  },
  {
    strict: true,
    collection: "User",
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
