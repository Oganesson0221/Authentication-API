const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  //! Get the token from the header

  const headerObj = req.headers;
  const token = headerObj.authorization.split(" ")[1];

  //! Verify token
  //Make sure to provide the exact key we provided in the controller {here it is 'anykey'}, for larger apps we can place this in the env variable
  //The decoded represents the user that was used to sign that token, and in this case we used the id
  const verifyToken = jwt.verify(token, "anykey", (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });

  if (verifyToken) {
    //! Save the user in req.obj

    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Token expired, please login again");
    next(err);
  }
};

module.exports = isAuthenticated;
