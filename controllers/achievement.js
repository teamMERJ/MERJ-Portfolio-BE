import { Achievements } from "../models/achievement.js";
import { achievementsSchema } from "../schema/achievement.js";

// this endpoint will post an achievement
export const postAchievement = async (req, res) => {
  try {
    const { error, value } = achievementsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("value", value);
    const newAchievement = await Achievements.create({
      ...req.body,
      image: req.file.filename,
    });

    //
    res.status(201).json(newAchievement);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get all events
export const getAchievements = async (req, res) => {
  try {
    const allAchievements = await Achievements.find();
    if (allAchievements.legth == 0) {
      return res.status(404).send("No achievement added");
    }
    res.status(200).json({ allAchievements });
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will get one event
export const getAchievement = async (req, res) => {
  try {
    const oneAchievement = await Achievements.findById(req.params.id);
    if (!oneAchievement) {
      return res.status(400).send('Achievement not found')
    }
    res.status(200).json(oneAchievement);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will update an achievement
export const patchAchievement = async (req, res) => {
  try {
    console.log(req.params.id);
    const { error, value } = achievementsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("value", value);
    const updateAchievement = await Achievements.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: req?.file?.filename },
      { new: true }
    );
    res.status(200).send(`This achievement ${updateAchievement.awards} was successfully updated`);
  } catch (error) {
    console.log(error);
  }
};

// this endpoint will delete an achievement

export const deleteAchievement = async (req, res) => {
  try {
    const { error, value } = achievementsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const deletedAchievement = await Achievements.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({message:'Achievement deleted successfully'});
  } catch (error) {
    console.log(error);
  }
};
