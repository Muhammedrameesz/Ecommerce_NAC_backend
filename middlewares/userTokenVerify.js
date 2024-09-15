const jwt = require("jsonwebtoken");

const verifyToken = async (req, res,next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    res.status(200).json({ valid: true,data: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, error: "Invalid token" });
  }
  
};

module.exports = verifyToken;