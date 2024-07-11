import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  otherNames: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  userName: { type: String, default: null },
  termsAndConditions: { type: Boolean },
});

export const UserModel = model("User", userSchema);
userSchema.plugin(toJSON);
