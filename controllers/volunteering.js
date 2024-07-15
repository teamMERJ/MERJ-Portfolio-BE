import { volunteeringModel } from "../models/volunteering.js";
import { userModel } from "../models/user.js";
import { volunteeringSchema } from "../schema/volunteering.js";

export const addVolunteering = async (req, res) => {
  try {
    const { error, value } = volunteeringSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Create volunteer with the value
    const volunteering = await volunteeringModel.create(value);

    // Find the user with the ID that you passed when creating the volunteer
    const userId = req.session.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Push the volunteer ID you just created into the user's volunteer array
    user.volunteering.push(volunteering._id);

    // Save the user now with the volunteer
    await user.save();

    // Return the volunteer
    res.status(201).json({ volunteering });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

// Get all volunteers
export const getAllVolunteering = async (req, res) => {
  try {
    const allVolunteerings = await volunteeringModel.find();
    if (allVolunteerings.length === 0) {
      return res.status(404).send('No Volunteering added');
    }

    res.status(200).json({allVolunteerings});
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

// Get a single volunteer by ID
export const getVolunteeringById = async (req, res) => {
  try {
    const getVolunteering = await volunteeringModel.findById(req.params.volunteerId);
    if (!getVolunteering) {
      return res.status(404).send('Volunteering not found');
    }

    res.status(200).json(getVolunteering);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

// Update volunteer
export const updateVolunteering = async (req, res) => {
  try {
    const { error, value } =volunteeringSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedVolunteering = await volunteeringModel.findByIdAndUpdate(
      req.params.volunteeringId,
      value,
      { new: true }
    );

    if (!updatedVolunteering) {
      return res.status(404).send('Volunteering not found');
    }

    res.status(201).json({ updateVolunteering });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Delete volunteer
export const deleteVolunteering = async (req, res) => {
  try {
    const deletedVolunteering = await volunteeringModel.findByIdAndDelete(req.params.volunteerId);

    if (!deletedVolunteering) {
      return res.status(404).send('Volunteering not available');
    }

    // Remove volunteer from user
    const user = await userModel.findById(deletedVolunteering.user);
    if (user) {
      user.volunteering = user.volunteering.filter(volunteerId => volunteerId.toString() !== req.params.volunteeringId);
      await user.save();
    }

    res.status(201).json({ deletedVolunteering});
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
