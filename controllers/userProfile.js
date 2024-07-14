import { userProfileModel } from "../models/userProfile.js";
import { userModel } from "../models/user.js";
import { profileSchema } from "../schema/userProfile.js";

// Create or update user profile
export const postUserProfile = async (req, res) => {
  try {
    const { error, value } = profileSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Find the user with the session ID
    // const userSessionId = req.session.user.id;
    
    const userId = value.user; 

    const user = await userModel.findById(userId);
  
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Create or update the user profile
    let userProfile = await userProfileModel.findOneAndUpdate(
       // Find by user ID
      { user: userId },
      value,
      // if unavailable, create a new user Id
      { new: true, upsert: true } 
    );

    // Associate the user profile with the user
    user.userProfile = userProfile._id;
    await user.save();

    // Return the user profile
    res.status(201).json({ userProfile });

  } catch (error) {
    console.error('Updating user profile failed');
    res.status(500).send(error.message);
  }
};

// Get a single user profile by ID
export const getOneProfile = async (req, res) => {
  try {
    const userProfile = await userProfileModel.findById(req.params.id);
    if (!userProfile) {
      return res.status(404).send('User profile not found');
    }
    res.status(200).json({ userProfile });
  } catch (error) {
    console.error('user profile not found');
    res.status(500).send(error.message);
  }
};

// Get all user related profiles
export const getAllProfile = async (req, res) => {
  try {
    // const userId = req.params.id;
    const relatedProfiles = await userProfileModel.find();
    if (relatedProfiles.length === 0) {
      return res.status(404).send('No profile added');
    }
    res.status(200).json({ relatedProfiles });
  } catch (error) {
    console.log(error);
    res. status(500).send(error.message)
  }
};

// Edit profile details
export const updateProfile = async (req, res) => {
  try {
    const { error, value } = profileSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedProfile = await userProfileModel.findByIdAndUpdate(
      req.params.userProfileId,
      value,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).send('User profile not found');
    }

    res.status(200).json({ message: `User profile with ID ${updatedProfile._id} has been successfully updated`, updatedProfile });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send(error.message);
  }
};


// Delete a profile
export const deleteUserProfile = async (req, res) => {
  try {
    const deletedUserProfile = await userProfileModel.findByIdAndDelete(req.params.userProfileId);

    if (!deletedUserProfile) {
      return res.status(404).send('User profile not found');
    }

    const user = await userModel.findById(deletedUserProfile.user);
    if (user) {
      user.userProfile = null;
      await user.save();
    }

    res.status(200).json({ message: `User profile with ID ${deletedUserProfile._id} has been deleted` });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).send(error.message);
  }
};

