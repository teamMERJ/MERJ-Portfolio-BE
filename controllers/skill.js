import { Skills } from "../models/skill.js";
import { skillsSchema } from "../schema/skill.js";

// this endpoint will post an Skills
export const postSkills = async (req, res) => {
  try {
    const { error, value } = skillsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("value", value);
    const newSkills = await Skills.create(value);

    //
    res.status(201).json(newSkills);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get all skills
export const skills = async (req, res) => {
  try {
    const allSkills = await Skills.find();
    if (allSkills.length == 0) {
      return res.status(404).send("No Skills added");
    }
    res.status(200).json(allSkills);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get one event
export const getSkill = async (req, res) => {
  try {
    const oneSkill = await Skills.findById(req.params.id);
    if (!oneSkill) {
      return res.status(400).send('Skills not found')
    }
    res.status(200).json(oneSkill);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will update a Skill
export const patchSkill = async (req, res) => {
  try {
    console.log(req.params.id);
    const { error, value } = skillsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("value", value);
    const updateSkill = await Skills.findByIdAndUpdate(
      req.params.id,
      { ...req.body},
      { new: true }
    );
    res.status(200).send(`Skill ${updateSkill} updated successfully`);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will delete a Skill

export const deleteSkill = async (req, res) => {
  try {
    const { error, value } = skillsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const deletedSkill = await Skills.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send(`Skill ${deletedSkill} deleted successfully`);
  } catch (error) {
    console.log(error);
  }
};