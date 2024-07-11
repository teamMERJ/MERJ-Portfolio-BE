import { Education } from "../models/education.js";
import { educationSchema } from "../schema/education.js";

// this endpoint will post an education
export const postEducation = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("value", value);
    const newEducation = await Education.create(value);

    //
    res.status(201).json(newEducation);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get all events
export const education = async (req, res) => {
  try {
    const allEducation = await Education.find();
    if (allEducation.length == 0) {
      return res.status(404).send("No education added");
    }
    res.status(200).json(allEducation);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get one event
export const getEducation = async (req, res) => {
  try {
    const oneEducation = await Education.findById(req.params.id);
    if (!oneEducation) {
      return res.status(400).send('Education not found')
    }
    res.status(200).json(oneEducation);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will update an education
export const patchEducation = async (req, res) => {
  try {
    console.log(req.params.id);
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("value", value);
    const updateEducation = await Education.findByIdAndUpdate(
      req.params.id,
      { ...req.body},
      { new: true }
    );
    res.status(200).send(`This education ${updateEducation.schoolName} was successfully updated`);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will delete an education

export const deleteEducation = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const deletedEducation = await Education.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send(`Education ${deletedEducation} deleted successfully`);
  } catch (error) {
    console.log(error);
  }
};
