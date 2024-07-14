import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const volunteeringSchema = new Schema({
  organization: { type: String },
  description: { type: String },
  location: { type: String },
  skills: { type: String },
  role: { type: String },
  responsibility: { type: String },
  projectName: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  user: { type: Types.ObjectId, ref: "userModel" },
});

volunteeringSchema.plugin(toJSON);

export const volunteeringModel = model("Volunteering", volunteeringSchema);
