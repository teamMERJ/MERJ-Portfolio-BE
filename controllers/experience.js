import { Experience } from "../models/experience.js";
import { experienceSchema } from "../schema/experience.js";

// this endpoint will post an experience
export const postExperience = async (req, res) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("value", value);
    const newExperience = await Experience.create(value);

    //
    res.status(201).json(newExperience);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get all events
export const experience = async (req, res) => {
  try {
    const allExperience = await Experience.find();
    if (allExperience.length == 0) {
      return res.status(404).send("No experience added");
    }
    res.status(200).json(allExperience);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get one event
export const getExperience = async (req, res) => {
  try {
    const oneExperience = await Experience.findById(req.params.id);
    if (!oneExperience) {
      return res.status(400).send('Experience not found')
    }
    res.status(200).json(oneExperience);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will update an Experience
export const patchExperience = async (req, res) => {
  try {
    console.log(req.params.id);
    const { error, value } = experienceSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("value", value);
    const updateExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      { ...req.body},
      { new: true }
    );
    res.status(200).send(`This experience ${updateExperience.companyName} was successfully updated`);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will delete an Experience

export const deleteExperience = async (req, res) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const deletedExperience = await Experience.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send(`Experience ${deletedExperience} deleted successfully`);
  } catch (error) {
    console.log(error);
  }
};