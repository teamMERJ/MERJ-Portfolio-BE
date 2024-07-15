// middlewares/auth.js
export const checkUserSession = (req, res, next) => {
    if (req.session.user) {
      return res.status(401).send('Unauthorized: No session available');
    }
    next();
  };
  