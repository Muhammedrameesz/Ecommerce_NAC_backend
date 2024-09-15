const userSchema = require("../Model/userShcema");
const bcrypt = require("bcrypt");

const userPasswordVerify = async (req, res) => {
  console.log("hitted");
  try {
    const userEmail = req.user;
    console.log("user", userEmail);
    const password = req.body.currentPassword;
    console.log("user typed password", password);
    const userExist = await userSchema.findOne({ email: userEmail });
    if (!userExist) {
      console.log("No userFound");
      return res.status(404).json({ status: false, message: "No user found" });
    }
    const decodedPassword = await bcrypt.compare(
      password,
      userExist.hashPassword
    );
    if (!decodedPassword) {
      console.log("Incorrect Password");
      return res
        .status(404)
        .json({ status: false, message: "Incorrect Password" });
    }
    console.log("decoded password", decodedPassword);
    return res
      .status(200)
      .json({ status: true, message: "Password verification success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
};

const editUser = async (req, res) => {
    try {
        console.log('body',req.body);
      const userEmail = req.user
      const { firstname, lastname, email, password } = req.body;
      if (!firstname || !lastname || !email || !password) {
        console.log("Required data not received");
        return res.status(400).json({ message: "Required data not received" });
      }

      const userExist = await userSchema.findOne({ email: userEmail });
      if (!userExist) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }

      const saltRound = 10;
      const hashPassword = await bcrypt.hash(password, saltRound);
  
      const updateUser = await userExist.updateOne({
        firstname,
        lastname,
        email,
        hashPassword: hashPassword,
      });
  
      if (updateUser.nModified === 0) {
        console.log("User not updated");
        return res.status(405).json({ message: "User not updated" });
      }
  
      console.log("User updated successfully", updateUser);
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

module.exports = { userPasswordVerify, editUser };
