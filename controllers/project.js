import { projectSchema } from "../schema/project.js";
import { User } from "../models/user.js";
import { Project } from "../models/project.js";

export const createUserProject = async (req, res, next) => {
  try {
  
    const { error, value } = projectSchema.validate({
      ...req.body, 
      image: req.file.filename
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
   
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const project = await Project.create({ ...value, user: userSessionId });

    user.projects.push(project._id)

    await user.save();

    res.status(201).json({ project });
  } catch (error) {
    next(error);
  }
};

// this endpoint will get one project
export const getProject = async (req, res, next) => {
  try {
    const oneProject  = await Project.findById(req.params.id);
    if (!oneProject) {
      return res.status(400).send("Project not found");
    }
    res.status(200).json(oneProject);
  } catch (error) {
    next(error);
  }
};


export const getAllUserProjects = async (req, res, next) => {
  try {
    //  fetch projects belonging to a  user
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const allProject = await Project.find({ user: userSessionId });
    if (allProject.length == 0) {
      return res.status(404).send("No Project added");
    }
    res.status(200).json({ Projects: allProject });
  } catch (error) {
    next(error)
  }
};



export const updateUserProject = async (req, res, next) => {
    try {
      const { error, value } = projectSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session?.user?.id || req?.user?.id;
      const user = await User.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await Project.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
      res.status(200).json({ project });
    } catch (error) {
      next (error)
    }
  };


  export const deleteUserProject = async (req, res, next) => {
    try {
     
  
      const userSessionId = req.session?.user?.id || req?.user?.id;
      const user = await User.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
        user.projects.pull(req.params.id);
        await user.save();
      res.status(200).json("Project deleted");
    } catch (error) {
      next (error)
    }
  };
  