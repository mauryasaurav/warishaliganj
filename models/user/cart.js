import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin_Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      default: false,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
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
    collection: "User_Carts",
    versionKey: false,
  }
);
const UserCartModel = mongoose.model("User_Carts", cartSchema);
export default UserCartModel;
