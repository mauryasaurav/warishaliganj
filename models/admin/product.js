import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    originalAmount: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: false,
      default: 0,
    },
    size: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin_Category",
    },
    maximumPurchase: {
      type: Number,
      default: 50,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: true,
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
    collection: "Admin_Products",
    versionKey: false,
  }
);
const AdminProductModel = mongoose.model("Admin_Products", productSchema);
export default AdminProductModel;
