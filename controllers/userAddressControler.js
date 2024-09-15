const userAddressModel = require("../Model/userAddressSchema");

const userAddress = async (req, res) => {
  try {
    const user = req.user;
    const { fullname, contactnumber, address } = req.body;
    const newAddress = new userAddressModel({
      fullname,
      contactnumber,
      address,
      user,
    });
    await newAddress.save();

    res.status(200).json({ message: "Address added successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
const getUserAdderss = async (req, res) => {
  try {
    const user = req.user;
    const userAdress = await userAddressModel.findOne({ user: user });

    // Corrected the variable name here
    if (!userAdress) {
      return res.status(200).json({ userDetails: false });
    }

    res.status(200).json({ userDetails: true, data: userAdress });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Occurred");
  }
};


const editUserAdderss = async (req, res) => {
  try {
    const user = req.user;
    console.log(req.body);
    const { fullname, contactnumber, address } = req.body;
    const updateResult = await userAddressModel.updateOne(
      {user:user},
      {
        fullname,
        contactnumber,
        address,
      },
      { new: true }
    );
    if (updateResult.nModified === 0) {
      return res.status(403).json("Something went wrong or no changes detected");
    }
    console.log('newUserAddress',updateResult);
    res.status(200).json({message:'Details updated successfullly'})
  } catch (error) {
     console.log(error);
     res.status(404).json({message:error.message})
  }
};

module.exports = { getUserAdderss, userAddress,editUserAdderss };
