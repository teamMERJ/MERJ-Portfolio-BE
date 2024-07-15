import { userProfileModel } from "../models/userProfile.js";
import { User } from "../models/user.js";
import { profileSchema } from "../schema/userProfile.js";


// create a user porfile
export const createUserProfile = async (req, res) => {
  try {
    const { error, value } = profileSchema.validate({
      ...req.body,
      profilePicture: req.files.filename,
      resume: req.files.filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
   

    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const profile = await UserProfile.create({ ...value, user: userSessionId });

    user.userProfile = profile._id;

    await user.save();

    res.status(201).json({ profile });
  } catch (error) {
    console.log(error);
  }
};



// get all user related profile details
export const getUserProfile = async (req, res) => {
  try {
  
    const userSessionId = req.session.user.id
    const profile = await UserProfile.find({ user: userSessionId });
    if (!profile) {
      return res.status(404).send("No profile added");
    }
    res.status(200).json({ profile});
  } catch (error) {
    return res.status(500).json({error})
  }
};


// edit profile details 
export const updateUserProfile = async (req, res) => {
  try {
    const { error, value } = profileSchema.validate({
      ...req.body,
      profilePicture: req.files.profilePicture[0].filename,
      resume: req.files.resume[0].filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id; 
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const profile = await UserProfile.findByIdAndUpdate(req.params.id, value, { new: true });
      if (!profile) {
          return res.status(404).send("Profile not found");
      }

    res.status(201).json({ profile });
  } catch (error) {
    console.log(error);
  }
};


// delete a profile
export const deleteUserProfile = async (req, res) => {
    try {
      const { error, value } = profileSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      console.log('value', value)

      const deletedprofile = await UserProfile.findByIdAndDelete(
        req.params.id
      );
      res.status(200).send(`Profile with ID ${deletedprofile} has deleted `);
    } catch (error) {
      console.log(error)
    }
  };

