import { User } from "../models/user.js";
import { userSchema } from "../schema/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const email = value.email;

    const findIfUserExist = await User.findOne({ email });
    if (findIfUserExist) {
      return res.status(401).send("User has already signed up");
    } else {
      const hashedPassword = await bcrypt.hash(value.password, 12);
      value.password = hashedPassword;

      await User.create(value);

      return res.status(201).json("User registration successful");
    }
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    //  Find a user using their email or username
    const user = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
    if (!user) {
      return res.status(401).json("User does not exist");
    }
    // Verify user password
    const correctPass = bcrypt.compare(password, user.password);
    if (!correctPass) {
      return res.status(401).json("Invalid login details");
    }
    // Generate a session for the user
    req.session.user = { id: user.id };

    // Return response
    res.status(201).json("Login successful");
  } catch (error) {
    next(error);
  }
};

// Login user with token
export const token = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    //  Find a user using their email or username
    const user = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
    if (!user) {
      return res.status(401).json("User does not exist");
    }
    // Verify user password
    const correctPass = bcrypt.compare(password, user.password);
    if (!correctPass) {
      return res.status(401).json("Invalid login details");
    }
    // Generate a token for the user
    const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "72h",
    });
    // Return response
    res.status(201).json({
      message: "Login successful",
      accessToken: token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userName = req.params.userName.toLowerCase();

    const options = { sort: { startDate: -1 } };
    const userDetails = await User.findOne({ userName })
      .select("-password")
      .populate({
        path: "education",
        options,
      })
      .populate("userProfile")
      .populate("skills")

      .populate({
        path: "achievements",
        options: { sort: { date: -1 } },
      })
      .populate({
        path: "experiences",
        options,
      })
      .populate({
        path: "volunteering",
        options,
      })
      .populate({
        path: "projects",
        options,
      });
      console.log(userDetails)

    return res.status(200).json({ user: userDetails });
  } catch (error) {
    console.log(error.message)
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  const email = req.query.email?.toLowerCase();
  const userName = req.query.userName?.toLowerCase();

  const filter = {};
  if (email) {
    filter.email = email;
  }
  if (userName) {
    filter.userName = userName;
  }

  const users = await User.find(filter);

  return res.status(200).json({ users });
};

export const logout = async (req, res, next) => {
  try {
    // Destroy user session
    await req.session.destroy();
    // Return response
    res.status(200).json("User logged out");
  } catch (error) {
    next(error);
  }
};
