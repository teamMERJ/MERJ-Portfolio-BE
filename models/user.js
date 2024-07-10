import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

// creating the user and adding all the contents of the portfolio

const userSchema = new Schema({
  user: {
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    username: { type: String, unique: true },
    termsAndConditions: { type: Boolean },
  },


  userProfile: {
    profilePicture: { type: String },
    location: { type: String },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "prefer-not-to-say"],
    },
    sex: { type: String, enum: ["male", "female"] },
    bio: { type: String },
    about: { type: String },
    dateOfBirth: { type: Date },
    contact: { type: String },
    cv: { type: String },
    languages: [{ type: String }],
  },


  socials: {
    gitHubLink: { type: String },
    LinkedInlink: { type: String },
  },


  skills: [
    {
      name: { type: String },
      levelOfProficiency: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "expert"],
      },
    },
  ],


  experience: [
    {
      companyName: { type: String },
      role: { type: String },
      skills: { type: String },
      responsibility: { type: String },
      location: { type: String },
      startDate: { type: String },
      endDate: { type: String },
    },
  ],


  education: [
    {
      schoolName: { type: String },
      location: { type: String },
      programme: { type: String },
      qualification: { type: String },
      grade: { type: String },
      startDate: { type: String },
      endDate: { type: String },
    },
  ],


  achievements: [
    {
      awards: { type: String },
      description: { type: String },
      image: { type: String },
      date: { type: String },
      nameOfInstitution: { type: String },
    },
  ],


  projects: [
    {
      projectName: { type: String },
      description: { type: String },
      contributors: { type: String },
      skills: { type: String },
      link: { type: String },
      nameOfInstitution: { type: String },
      startDate: { type: String },
      endDate: { type: String },
    },
  ],


  volunteering: [
    {
      organization: { type: String },
      description: { type: String },
      location: { type: String },
      skills: { type: String },
      role: { type: String },
      responsibility: { type: String },
      projectName: { type: String },
      startDate: { type: String },
      endDate: { type: String },
    },
  ],
});


export const userModel = model("User", userSchema);
userSchema.plugin(toJSON);
