import {Volunteering} from "../models/volunteering.js"
import { User } from "../models/user.js";
import { volunteeringSchema } from "../schema/volunteering.js";


export const createUserVolunteering= async (req, res, next) => {
  try {
    const { error, value } = volunteeringSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
   

    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const volunteering = await Volunteering.create({ ...value, user: userSessionId });

    user.volunteering.push(volunteering.id)

    await user.save();

    res.status(201).json({ volunteering });
  } catch (error) {
    next(error);
  }
};

// this endpoint will get one volunteering experience
export const getVolunteering = async (req, res, next) => {
  try {
    const oneVolunteering  = await Volunteering.findById(req.params.id);
    if (!oneVolunteering) {
      return res.status(400).send("Volunteering experience not found");
    }
    res.status(200).json(oneVolunteering);
  } catch (error) {
    next(error);
  }
};



export const getAllUserVolunteering= async (req, res) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    console.log("User Session ID:", userSessionId); // Log the user ID to verify

    // Fetch all experiences that belong to the userSessionId
    const allVolunteering = await Volunteering.find({ user: userSessionId });
    console.log("All Volunteering:", allVolunteering); // Log the fetched experiences

    if (allVolunteering.length === 0) {
      return res.status(404).send("No volunteering added");
    }

    res.status(200).json({ Volunteering: allVolunteering});
  } catch (error) {
    console.error("Error fetching experiences:", error); // Log any errors encountered
    res.status(500).json({ error: "Internal Server Error" });
  }
};




export const updateUserVolunteering = async (req, res) => {
    try {
      const { error, value } = volunteeringSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session?.user?.id || req?.user?.id; 
      const user = await User.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const volunteering = await Volunteering.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!volunteering) {
            return res.status(404).send("experience not found");
        }
  
      res.status(200).json({ volunteering });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  };


  export const deleteUserVolunteering = async (req, res) => {
    try {
     
  
      const userSessionId = req.session?.user?.id || req?.user?.id;
      const user = await User.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const volunteering = await Volunteering.findByIdAndDelete(req.params.id);
        if (!volunteering) {
            return res.status(404).send("Volunteering not found");
        }
  
        user.volunteering.pull(req.params.id);
        await user.save();
      res.status(200).json("Volunteering deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  
