import { Schema, model } from "mongoose";

const labelsSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    color: {
      type: String,
      required: true,
      trim: true
    },
    notes: {
      type: Array,
      required: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model("Labels", labelsSchema);
