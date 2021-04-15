import { Schema, model } from "mongoose";

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    favorite: {
      type: Boolean,
      required: false
    },
    label: {
      type: Object,
      required: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model("Notes", notesSchema);
