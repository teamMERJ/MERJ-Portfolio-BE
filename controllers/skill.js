import { Skills } from "../models/skill.js";
import { User } from "../models/user.js";
import { skillsSchema } from "../schema/skill.js";

export const createUserSkill = async (req, res, next) => {
  try {
    const { error, value } = skillsSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await Skills.create({ ...value, user: userId });

    user.skills.push(skill._id);

    await user.save();

    res.status(201).json({ skill });
  } catch (error) {
    next(error);
  }
};

// this endpoint will get one skills
export const getSkill = async (req, res, next) => {
  try {
    const oneSkill = await Skills.findById(req.params.id);
    if (!oneSkill) {
      return res.status(400).send(oneSkill);
    }
    res.status(200).json({Skills: oneSkill});
  } catch (error) {
    next(error);
  }
};

export const getAllUserSkills = async (req, res, next) => {
  try {
    //we are fetching Skill that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id;
    const allSkill = await Skills.find({ user: userId });
    if (allSkill.length == 0) {
      return res.status(404).send(oneSkill);
    }
    res.status(200).json({ Skills: allSkill });
  } catch (error) {
    next(error);
  }
};

export const updateUserSkill = async (req, res, next) => {
  try {
    const { error, value } = skillsSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await Skills.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!skill) {
      return res.status(404).send({Skill:skill});
    }

    res.status(200).json({ skill });
  } catch (error) {
    next(error);
  }
};

export const deleteUserSkill = async (req, res, next) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await Skills.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).send("Skill not found");
    }

    user.skills.pull(req.params.id);
    await user.save();
    res.status(200).json("Skill deleted");
  } catch (error) {
    next(error);
  }
};
