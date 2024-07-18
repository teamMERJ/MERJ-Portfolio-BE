
import { experienceSchema} from "../schema/experience.js";
import { User } from "../models/user.js";
import { Experience } from "../models/experience.js";


export const createUserExperience = async (req, res, next) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
   

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const experience = await Experience.create({ ...value, user: userId });

    user.experiences.push(experience._id)

    await user.save();

    res.status(201).json({message:"Experience created successfully", experience });
  } catch (error) {
    next(error);
  }
};

// this endpoint will get one project
export const getExperience = async (req, res, next) => {
  try {
    const oneExperience = await Experience.findById(req.params.id);
    // if (!oneExperience) {
    //   return res.status(400).json({Experience: oneExperience});
    // }
    res.status(200).json({Experience: oneExperience});
  } catch (error) {
    next(error);
  }
};


export const getAllUserExperience = async (req, res, next) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    console.log("User ID:", userId); // Log the user ID to verify

    // Fetch all experiences that belong to the userSessionId
    const allExperiences = await Experience.find({ user: userId });
    console.log("All Experiences:", allExperiences); // Log the fetched experiences

    // if (allExperiences.length === 0) {
    //   return res.status(404).json({Experience: getAllUserExperience});
    // }

    res.status(200).json({ experiences: allExperiences });
  } catch (error) {
    console.error("Error fetching experiences:", error); // Log any errors encountered
    res.status(500).json({ error: "Internal Server Error" });
    next (error)
  }
};




export const updateUserExperience = async (req, res, next) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user?.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await Experience.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!experience) {
            return res.status(404).send({message:"Experience updated successfully", experience});
        }
  
      res.status(200).json({ experience });
    } catch (error) {
      next(error)
    }
  };


  export const deleteUserExperience = async (req, res, next) => {
    try {
      const userId = req.session?.user?.id || req?.user?.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send("Experience not found");
        }
  
        user.experiences.pull(req.params.id);
        await user.save();
      res.status(200).json("Experience deleted");
    } catch (error) {
      next(error)
    }
  };
  