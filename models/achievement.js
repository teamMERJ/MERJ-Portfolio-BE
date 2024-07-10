import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const achievementsSchema = new Schema({
  awards: { type: String },
  description: { type: String },
  image: { type: String },
  date: { type: String },
  nameOfInstitution: { type: String },
  user: { type: Types.ObjectId, ref: "User" },
});

achievementsSchema.plugin(toJSON);

export const Achievements = ("Achievements", achievementsSchema);
