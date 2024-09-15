const userProfilePicture = require("../Model/userProfilePicture");
const cloudinaryIntance = require("../config/cloudinary");
const userProfile = require("../Model/userShcema");

const AddProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      console.log("No image file received");
      return res.status(400).json({ message: "Image not received" });
    }
    const email = req.user;
    if (!email) {
      console.log("No user email found");
      return res.status(400).json({ message: "User email not found" });
    }
    const result = await cloudinaryIntance.uploader.upload(req.file.path);
    const imageUrl = result.secure_url; 
    const profilePicture = new userProfilePicture({
      image: imageUrl,
      userEmail: email,
    });

    const newProfile = await profilePicture.save();
    if (!newProfile) {
      console.log("Error saving profile");
      return res.status(500).json({ message: "Error saving profile" });
    }

    return res.status(200).json({ message: "Profile created successfully" });
  } catch (error) {
    console.error("Internal server error:", error);
    if (error.http_code === 502) {
      return res.status(502).json({ message: "Cloudinary service issue, please try again later" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};



const getUserProfilePicture = async (req, res) => {
  try {
    const email = req.user;
    if (!req.user) {
      console.log("no user found");
      return res.status(404).json({ message: "Credentials error" });
    }
    const user = await userProfilePicture.findOne({ userEmail: email });
    if (!user) {
      console.log("no user found");
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};   

const EditProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      console.log("No image file provided");
      return res.status(400).json({ message: "Image not received" });
    }

    const email = req.user;
    if (!email) {
      console.log("Credentials Error");
      return res.status(401).json({ message: "Credentials Error" });
    }

    const user = await userProfilePicture.findOne({ userEmail: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const imagePublicId = user.image.split("/").pop().split(".")[0];
    try {
      await cloudinaryIntance.uploader.destroy(imagePublicId);
      console.log('picture delated successfully ');
    } catch (err) {
      console.error("Failed to delete image from Cloudinary:", err);
      return res.status(400).json({ message: "Failed to delete image from Cloudinary" });
    }

    const result = await cloudinaryIntance.uploader.upload(req.file.path);
    const imageUrl = result.url;

    const profilePicture = await userProfilePicture.updateOne(
      { userEmail: email },
      { image: imageUrl, userEmail: email }
    );

    if (!profilePicture) {
      console.log("Error updating profile picture");
      return res.status(500).json({ message: "Error updating profile picture" });
    }

    return res.status(200).json({ message: "Profile picture updated successfully" });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};


const getUserDetails = async (req, res) => {
  try {
    const userEmai = req.user;
    const getUserProfile = await userProfile.findOne({ email: userEmai });
    if (!getUserProfile) {
      console.log("no user found");
      return res.status(404).json({ message: "No user Found" });
    }
    return res.status(200).json({ user: getUserProfile });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  AddProfilePicture,
  getUserProfilePicture,
  EditProfilePicture,
  getUserDetails,
};
