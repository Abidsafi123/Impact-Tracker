import mongoose from "mongoose";

const updateSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
  },
  { timestamps: true },
);
const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,

      default: "",
    },
    image: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    members: {
      type: [String],
      default: [],
    },
    updates: {
      type: [updateSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const problemModel = mongoose.model("problem", problemSchema);
export default problemModel;
