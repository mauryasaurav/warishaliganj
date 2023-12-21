import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: null },
    email: { type: String, default: null },
    countryCode: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "admin",
    },
    deviceToken: {
      type: String,
      default: null,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Number,
      default: new Date().getTime(),
    },
  },
  {
    strict: true,
    collection: "Admin",
    versionKey: false,
    timestamps: true,
  }
);

const AdminUserModel = mongoose.model("Admin_User", adminSchema);
export default AdminUserModel;
