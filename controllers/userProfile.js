import { UserProfile } from "../models/userProfile.js";
import { User } from "../models/user.js";
import { profileSchema } from "../schema/userProfile.js";


// post a user porfile
export const postUserProfile = async (req, res) => {
  try {
    const { error, value } = profileSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // create user profile
    const userSessionId = req.session.user.id
    // create user profile with value
    const user = await User.findById(userSessionId);

    // find user with ID that was passed by creating the profile
    if (!user) {
      return res.status(404).send('User not found');
    }

    const profile = await UserProfile.create(value)
    // push the profile that was created in the user found
    user.userProfile = profile._id

    // save the user with the userprofile ID
    await User.save();

    // return response
    res.status(201).json({profile})
  } catch (error) {
    console.log(error)
  }
};


// get only one user profile
export const getOneProfile = async (req, res) => {
  const userProfile = await profileSchema.findById(req.params.id)
  res.status(200).json(userProfile)
}


// get all user related profile details
export const getAllProfile = async (req, res) => {
  try {
    // get all profile details related to the user
    const userId = req.params.id
    const relatedProfile = await profileSchema.find({ userId })
    if (relatedProfile.length == 0) {
      return res.status(404).send('No profile added')
    }
    res.status(200).json({ relatedProfile })
  } catch (error) {
    next(error)
  }
}


// edit profile details 
export const patchProfile = async (req, res) => {
  try {
    const { error, value} = profileSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedProfile = await profileSchema.findByIdAndUpdate(req.params.id,
      {...req.body},
      {new: true}
    );
    res.status(200). send(`User profile with ID ${updatedProfile.location} has been successfully updated`)

  } catch (error) {
    console.log(error)
  }
};


// delete a profile
export const deleteUserProfile = (req, res) => {
  try {
    const { error, value} = profileSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const deletedProfile = profileSchema.findByIdAndDelete(req.params.id)
    res.status(200).send(`User profile with ID ${deleteUserProfile} has been deleted`)
  } catch (error) {
    console.log(error)
  }
}


