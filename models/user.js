import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  otherNames: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  username: { type: String, unique: true },
  termsAndConditions: { type: Boolean }
});

export const User = model("User", userSchema);
userSchema.plugin(toJSON);
