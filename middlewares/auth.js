import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else if (req.headers.authorization) {
   try {
     // extract token from headers
     const token = req.headers.authorization.split(" ")[1];
     // verify the token to get user and append to request
     req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);   
     // call next function
     next()
   } catch (error) {
   }
  } else {
    res.status(401).json("User not authenticated");
  }
};
