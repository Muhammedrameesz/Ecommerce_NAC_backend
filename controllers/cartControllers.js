const cartSchema = require("../Model/cartSchema");

const cartItems = async (req, res) => {
  try {
    const email = req.user;
    const { title, description, price, category, image, productQuantity, _id } = req.body.item;
    if (!title || !description || !price || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userProducts = await cartSchema.find({ user: email });
    const itemExist = userProducts.find(
      (item) => item.title === title && item.price === price
    );
    if (itemExist) {
      return res.status(409).json({ message: "Item already exists in cart" });
    }

    // Create a new cart item
    const newCartItem = new cartSchema({
      user: email,
      title,
      description,
      price,
      category,
      productQuantity,
      image,
      productId:_id
    });

    const savedCartItem = await newCartItem.save();
    if (!savedCartItem) {
      return res.status(400).json({ message: "Failed to add item to cart" });
    }
    const updatedUserProducts = await cartSchema.find({ user: email });
    const cartLength = updatedUserProducts.length;
    res
      .status(200)
      .json({ message: "Product added to cart", length: cartLength });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const email = req.user;
    const cartItems = await cartSchema.find({ user: email });
    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);
    res.status(404).send("Error Occurred");
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const user = req.user;
    const itemId = req.params.id;
    const Product = await cartSchema.deleteOne({ user: user, _id: itemId });
    if (!Product) {
      return res.status(404).json({ message: "No products in cart" });
    }
    const updatedUserProducts = await cartSchema.find({ user: user });
    res.status(200).json({
      message: "Product deleted from cart",
      data: itemId,
      updatedLength: updatedUserProducts.length,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error.message });
  }
};

const changeCartQuantity = async (req, res) => {
    try {
      const user = req.user; 
      const updatedItems = req.body; 
      if (!Array.isArray(updatedItems)) {
        return res.status(400).json({ message: "Invalid data format" });
      }
      const updatePromises = updatedItems.map(async (item) => {
        const itemToUpdate = await cartSchema.findOne({ _id: item._id, user: user });
        if (!itemToUpdate) {
          console.log(`Item with id ${item._id} not found for user ${user}`);
          return; 
        }
        itemToUpdate.quantity = item.quantity;
        return itemToUpdate.save();
      });
      await Promise.all(updatePromises);
  
      res.status(200).json({ message: "Quantities updated successfully" });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send({ message: "Server error" });
    }
  };
  
  
module.exports = { cartItems, getCartProducts, deleteCartItem,changeCartQuantity };
