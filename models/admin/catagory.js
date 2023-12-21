import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Number,
      default: () => new Date().getTime(),
    },
    updatedAt: {
      type: Number,
      default: () => new Date().getTime(),
    },
  },
  {
    strict: true,
    collection: "Admin_Category",
    versionKey: false,
  }
);
const AdminCatagoryModel = mongoose.model("Admin_Category", catagorySchema);
export default AdminCatagoryModel;
