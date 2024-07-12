import { Project } from "../models/project.js";
import { projectSchema } from "../schema/project.js";

// this endpoint will post an project
export const postProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("value", value);
    const newProject = await Project.create(value);

    //
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get all events
export const project = async (req, res) => {
  try {
    const allProject = await Project.find();
    if (allProject.length == 0) {
      return res.status(404).send("No project added");
    }
    res.status(200).json(allProject);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get one event
export const getProject = async (req, res) => {
    try {
      const oneProject = await Project.findById(req.params.id);
      if (!oneProject) {
        return res.status(400).send('project not found')
      }
      res.status(200).json(oneProject);
    } catch (error) {
      console.log(error);
    }
  };
  
  // this endpoint will update an project
  export const patchProject = async (req, res) => {
    try {
      console.log(req.params.id);
      const { error, value } = projectSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      console.log("value", value);
      const updateProject = await Project.findByIdAndUpdate(
        req.params.id,
        { ...req.body},
        { new: true }
      );
      res.status(200).send(`This project was successfully updated`);
    } catch (error) {
      console.log(error);
    }
  };
  
  // this endpoint will delete an project
  
  export const deleteProject = async (req, res) => {
    try {
      const { error, value } = projectSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      const deletedProject = await Project.findByIdAndDelete(
        req.params.id
      );
      res.status(200).send(`project ${deletedProject} deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  };