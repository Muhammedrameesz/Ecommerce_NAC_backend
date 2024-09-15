const cloudinaryIntance = require("../config/cloudinary");
const Products = require("../Model/productSchema");
const fs = require("fs");
const path = require("path");



// Add Product 
const product = async (req, res) => {
  try {
    if (!req.file) {
      console.log("nofilkes uploaded");
      return res.sen("no files uploaded");
    }

    cloudinaryIntance.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log("Err:", err);
        return res
          .status(401)
          .send({ status: false, messege: "error", data: null });
      }

      const imageUrl = await result.url;

      const data = await req.body;
      // console.log(`data: ${JSON.stringify(data)}`);

      const { title, description, price,category,productQuantity } = data;

      const newProduct = new Products({
        title,
        description,
        price,
        category,
        productQuantity,
        image: imageUrl,
      });

      const productCreated = await newProduct.save();

      if (!productCreated) {
        console.log("Product not created");
        return res
          .status(401)
          .send({ status: false, messege: "error", data: null });
      }

      console.log("Product created successfully");
      return res.status(200).send({ messege: "success", data: productCreated });
    });
  } catch (error) {
    console.log(error);
  }
};


// Get All Product 
const getProduct = async (req, res) => {
  try {
    const product = await Products.find();
    return res.status(200).send(product);
  } catch (error) {
    return res.status(401).send({ messege: error.messege });
  }
};


// Get Product By ID 
const getProductById = async (req, res) => {
  try {
    const id = await req.params.id;
    const product = await Products.findById(id).exec();
    return res.status(200).send(product);
  } catch (error) {
    return res.status(401).send({ messege: error.messege });
  }
};


// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: "No product id provided" });
    }
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const imagePublicId = product.image.split("/").pop().split(".")[0]; // Extract the public_id from the URL

    await cloudinaryIntance.uploader.destroy(imagePublicId, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(400)
          .send({ message: "Failed to delete image from Cloudinary" });
      }
    });

    await Products.findByIdAndDelete(id);

    res.status(200).send({ message: "Product successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: " Error" });
  }
};

//  Edit product
const editProuct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: "No product id provided" });
    }
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const imagePublicId = product.image.split("/").pop().split(".")[0];
    await cloudinaryIntance.uploader.destroy(imagePublicId, (err, result) => {
      if (err) {
        console.error(err);
        return res
         .status(400)
         .send({ message: "Failed to delete image from Cloudinary" });
      }
    });

    const { title, price, description,category,productQuantity } =req.body;
    const image = req.file;
    if (!image) {
      console.log("No image uploaded");
      return res.status(404).json({message:'no image uploaded'});
    }

    cloudinaryIntance.uploader.upload(image.path, async (err, result) => {
      if (err) {
        console.log("Err:", err);
        return res
          .status(401)
          .send({ status: false, messege: "error", data: null });
      }
      const imageUrl = await result.url;

      const updateProduct = await Products.findByIdAndUpdate(
        id,
        {          
          title,
          price,
          description,
          category,
          productQuantity,
          image: imageUrl,
        },
        { new: true }
      );

      if (!updateProduct) {
        return res.status(404).send({ message: "Product not updated" });
      }
      
      res.status(200).send(updateProduct);
    });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Error" });
  }
};

module.exports = {
  product,
  getProduct,
  getProductById,
  deleteProduct,
  editProuct,
};
