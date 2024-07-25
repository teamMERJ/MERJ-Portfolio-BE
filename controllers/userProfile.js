import { userProfileModel } from "../models/userProfile.js";
import { User } from "../models/user.js";
import { profileSchema } from "../schema/userProfile.js";


// create a user porfile
export const createUserProfile = async (req, res, next) => {
  try {
    const { error, value } = profileSchema.validate({
      ...req.body,
      profilePicture: req.files?.profilePicture[0].filename,
      resume: req.files?.resume[0].filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const userId = req.session?.user?.id || req?.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const profile = await userProfileModel.create({ ...value, user: userId });

    user.userProfile = profile._id;

    await user.save();

    res.status(201).json({message:"Profile created successfully", profile });
  } catch (error) {
    next(error);
  }
};


// get all user related profile details
export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const profile = await userProfileModel.findOne({ user: userId }).populate({
      path: 'user',
      select: '-password'
    });

    if (!profile) {
      const user = await User.findById(userId).select({firstName: true, lastName:true})
      return res.status(200).json({Profile:user});
    }
    res.status(200).json({ profile }); 
  } catch (error) {
    next(error);
  }
};


// edit profile details
export const updateUserProfile = async (req, res, next) => {
  try {
    const { error, value } = profileSchema.validate({
      ...req.body,
      profilePicture: req.files?.profilePicture?.filename,
      resume: req.files?.resume?.filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);                                                     
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const profile = await userProfileModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!profile) {
      return res.status(404).json("Profile not found");
    }

    res.status(201).json({message:"Profile updated successfully" ,profile });
  } catch (error) {
    next(error);
  }
};


