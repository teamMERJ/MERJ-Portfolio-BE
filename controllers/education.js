import { User } from "../models/user.js";
import {Education} from "../models/education.js"
import { educationSchema } from "../schema/education.js";


//  add education for a user
export const addEducation = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }


    // after doing that find user with the id that you passed when creating education
    const user = await User.findById(value.user);
    if (!user) {
      return res.status(400).send("User not found");
    }
    
    // create education with the value
    const newEducation = await Education.create(value);

    

    // if you find the user push the education id that was just created
    user.education.push(newEducation.id);

    //and save the user now with the educationId
    await user.save();
    //return response
    //return the education
    res.status(201).json({ education });
  } catch (error) {
    return res.status(500).send(error);
  }
};
// this endpoint will get all education

export const getAllUserEducation = async (req, res) => {
  try {
    // Fetch all education records belonging to the specified user ID
    const allEducation = await Education.find({ user: req.user.id });

    if (allEducation.length == 0) {
      return res.status(404).send("No education added");


    //find a user with the id that was passed when creating the education
    console.log('userId', req.session.user.id)

    const userSessionId = req.session.user.id

    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    //create education with the content provided
    const education = await Education.create({ ...value, user: userSessionId });
    //if user is found, push the id of education created inside
    user.education.push(education._id);

    //save user with the education ID
    await user.save();

    //return education created
    res.status(201).json({ education });
  } catch (error) {
    return res.status(500).send(error);
  }
};


// this endpoint will get one education
export const getEducation = async (req, res) => {
  try {
    const educationId = req.params.id;
    //fetching one education that belongs to a particular user
    const oneEducation = await Education.findOne({
      id: educationId,
      user: req.user.id,
    });
    if (!oneEducation) {
      return res.status(400).send("Education not found");


// get all education of a user
export const getAllUserEducation = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    console.log(userSessionId)
    // Query education records that belong to the userSessionId
    const alleducation = await Education.find({ user: userSessionId }).exec();

    if (alleducation.length === 0) {
      return res.status(404).send("No education found for this user");

    }

    res.status(200).json({ education: alleducation });
  } catch (error) {
    console.error(error); // Log any unexpected errors for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// update an education of a user
export const updateUserEducation = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Filter by both education ID and user ID

    const updateEducation = await Education.findByIdAndUpdate(
      req.params.id,
      { ...value },
      { new: true }
    );
    res
      .status(200)
      .send(`Education ${updateEducation} was successfully updated`);


    const userSessionId = req.session.user.id; 
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedEducation = await Education.findByIdAndUpdate(req.params.id, value, { new: true });
      if (!Education) {
          return res.status(404).send("Education not found");
      }

    res.status(201).json({ Education: updatedEducation });

  } catch (error) {
    return res.status(500).json({error})
  }
};

//  delete an education of a user

export const deleteUserEducation = async (req, res) => {
  try {
   

    const userSessionId = req.session.user.id; 
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Filter by both education ID and user ID
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    res.status(200).send(`Education ${deletedEducation} deleted successfully`);


    const education = await Education.findByIdAndDelete(req.params.id);
      if (!education) {
          return res.status(404).send("Education not found");
      }

      user.education.pull(req.params.id);
      await user.save();
    res.status(200).json("Education deleted");

  } catch (error) {
    return res.status(500).json({error})
  }
};


