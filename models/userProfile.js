import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userProfileSchema = new Schema({
    profilePicture: { type: String },
    location: { type: String },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "prefer-not-to-say"]},
    sex: { type: String, enum: ["male", "female"] },
    bio: { type: String },
    about: { type: String },
    dateOfBirth: { type: Date },
    contact: { type: String },
    cv: { type: String },
    languages: [{ type: String }],
    gitHubLink: { type: String },
    linkedInlink: { type: String },
    user: {type:Types.ObjectId, ref: 'userModel'}
});

userProfileSchema.plugin(toJSON);
export const userProfileModel = model("UserProfile", userProfileSchema);
