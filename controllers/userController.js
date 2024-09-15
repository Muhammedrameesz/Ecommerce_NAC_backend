const bcrypt = require("bcrypt");
const User = require("../Model/userShcema");
// const jwt = require('jsonwebtoken')
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const data = await req.body;
    const { firstname, lastname, email, password } = data;
    console.log("passwrd", password);
    if (data) {
      const userExist = await User.findOne({ email });

      if (userExist) {
        console.log("User already exists");
        return res
          .status(200)
          .send({ status: false, messege: "User already exist" });
      }

      const saltRound = 10;
      const hashPassword = await bcrypt.hash(password, saltRound);
      console.log("hashpassword", hashPassword);
      const newUser = new User({
        firstname,
        lastname,
        email,
        hashPassword,
      });

      const newOne = await newUser.save();
      if (!newOne) {
        console.log("User not created");
        return res.status(200).send({ status: false, messege: "error" });
      }

      const token = generateToken(email);
      res.status(200).send({ status: true, messege: "success", token: token });
    } else {
      res.status(404).send({ status: false, messege: "error", token: null });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ cookies: "Error Ocuurted" });
  }
};

const login = async (req, res) => {
  try {
    const data = await req.body;

    const { email, password } = data;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).send({ status: false, messege: "user not found" });
    }

    const verify = await bcrypt.compare(password, user.hashPassword);
    if (!verify) {
      return res
        .status(200)
        .send({ status: false, messege: "Password not match" });
    }
    const token = generateToken(email);
    res.status(200).send({ status: true, messege: "success", token: token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: true, messege: "error" });
  }
};

module.exports = {
  login,
  signup,
};
