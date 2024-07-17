import { Education } from "../models/education.js";
import { educationSchema } from "../schema/education.js";
import { User } from "../models/user.js";

//  add education for a user
export const addEducation = async (req, res, next) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //find a user with the id that was passed when creating the education
    console.log("userId", req.session.user.id);
    const userSessionId = req.session?.user?.id || req?.user?.id;
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
    next(error);
  }
};

// get all education of a user
export const getAllUserEducation = async (req, res, next) => {
  console.log("kokiok");
  try {
    //fetch education for  a user
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const alleducation = await Education.find({ user: userSessionId });
    console.log("kokiok", alleducation);
    if (alleducation.length === 0) {
      return res.status(404).send("No education found for this user");
    }

    res.status(200).json({ education: alleducation });
  } catch (error) {
    // Log any unexpected errors for debugging
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};
// update an education of a user
export const updateUserEducation = async (req, res, next) => {
  try {
    const { error, value } = educationSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!Education) {
      return res.status(404).send("Education not found");
    }

    res.status(201).json({ Education: updatedEducation });
  } catch (error) {
    next(error)
  }
};

//  delete an education of a user

export const deleteUserEducation = async (req, res) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).send("Education not found");
    }

    user.education.pull(req.params.id);
    await user.save();
    res.status(200).json("Education deleted");
  } catch (error) {
    next(error);
  }
};
