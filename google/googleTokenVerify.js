const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyGtoken = async (req, res) => {
  try {
    const { token } = req.body; 
   

    if (!token) {
      console.log("No token received");
      return res.status(401).json({ message: "Token is required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      console.log("Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    }
  
    return res.status(200).json({ message: "Token is valid", decode:decodedToken });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyGtoken;
