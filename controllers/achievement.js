import { Achievement } from "../models/achievement.js";
import { achievementSchema } from "../schema/achievement.js";
import { User } from "../models/user.js";

export const createUserAchievement = async (req, res, next) => {
  try {
    const { error, value } = achievementSchema.validate({
      ...req.body,
      image: req.file.filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;

    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await Achievement.create({
      ...value,
      user: userSessionId,
    });

    user.achievements.push(achievement.id);

    await user.save();

    res.status(201).json({ achievement });
  } catch (error) {
    next(error);
  }
};

// this endpoint will get one achievement
export const getOneAchievement= async (req, res, next) => {
  try {
    const oneAchievement = await Achievement.findById(req.params.id);
    if (!oneAchievement) {
      return res.status(400).send("Achievement not found");
    }
    res.status(200).json(oneAchievement);
  } catch (error) {
    next(error);
  }
};

export const getAllUserAchievements = async (req, res, next) => {
  try {
    // fetching achievements that belongs to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const allAchievement = await Achievement.find({ user: userSessionId });
    if (allAchievement.length == 0) {
      return res.status(404).send("No Achievement added");
    }
    res.status(200).json({ Achievements: allAchievement });
  } catch (error) {
    next(error);
  }
};

export const updateUserAchievement = async (req, res, next) => {
  try {
    const { error, value } = achievementSchema.validate({
      ...req.body,
      image: req.file.filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!achievement) {
      return res.status(404).send("Achievement not found");
    }

    res.status(200).json({ achievement });
  } catch (error) {
    next(error);
  }
};

export const deleteUserAchievement = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).send("Achievement not found");
    }

    user.achievements.pull(req.params.id);
    await user.save();

    res.status(200).json("Achievement deleted");
  } catch (error) {
    next(error);
  }
};
