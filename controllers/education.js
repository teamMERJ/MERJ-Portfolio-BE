import { Education } from "../models/education.js";
import { educationSchema } from "../schema/education.js";

// this endpoint will post an education
export const postEducation = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
     //Assuming user ID is available in req.user 
     const userId = req.user.id;
    // Assign the user ID to the education record
    value.user = userId; 
    const newEducation = await Education.create(value);

    //
    res.status(201).json(newEducation);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get all education

export const getAllUserEducation = async (req, res) => {
  try {
     // Assuming user ID is available in req.params.id
     const userId = req.user.id;
    // Fetch all education records belonging to the specified user ID
    const allEducation = await Education.find({ user: userId });

    if (allEducation.length == 0) {
      return res.status(404).send("No education added");
    }
    res.status(200).json(allEducation);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get one education
export const getEducation = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user 
    const educationId = req.params.id;
    //fetching one education that belongs to a particular user
    const oneEducation = await Education.findById({id:educationId, user:userId});
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
    // Filter by both education ID and user ID
    const userId = req.user.id; 
    const updateEducation = await Education.findByIdAndUpdate(
      {id:req.params.id, user:userId},
      { ...value},
      { new: true }
    );
    res.status(200).send(`Education ${updateEducation} was successfully updated`);
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
     // Filter by both education ID and user ID
     const userId = req.user.id;
    const deletedEducation = await Education.findByIdAndDelete({id:req.params.id, user: userId}
    );
    res.status(200).send(`Education ${deletedEducation} deleted successfully`);
  } catch (error) {
    console.log(error);
  }
};
