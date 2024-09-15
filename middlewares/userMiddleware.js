const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  if (!req.headers["authorization"]) {
    return res.status(400).json({ message: "Invalid authorization header" });
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = user.data;
    next();
  });
}

module.exports = userAuth;
