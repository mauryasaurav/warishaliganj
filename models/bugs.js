import mongoose from "mongoose";

const bugsSchema = new mongoose.Schema(
  {
    error: { type: String, default: null, required: true },
  },
  {
    strict: true,
    versionKey: false,
    timestamps: true,
  }
);

const BugsModal = mongoose.model("bugs", bugsSchema);

export default BugsModal;
