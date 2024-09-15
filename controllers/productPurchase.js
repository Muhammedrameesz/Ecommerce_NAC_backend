const { json } = require("express");
// const userDetail = require("../Model/userDetailsSchema");
const nodemailer = require("nodemailer");

const purchasedProduct = async (req, res) => {

  
  try {
    console.log('body',req.body);
    const cartItems = JSON.parse(req.body.cartItems);
    const userDetails = JSON.parse(req.body.userDetails);
    const totalPrice = JSON.parse(req.body.totalPrice);
   

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_NAME,
        pass: process.env.USER_PASSWORD,
      },
    });

    const styles = `
      <style>
        h1, h3, p, span, b {
          color: black;
          font-family: Arial, sans-serif;
        }
        u {
          text-decoration: none;
          border-bottom: 1px solid black;
        }
      </style>
    `;

    let htmlContent = "<div>";
    cartItems.forEach((item) => {
      htmlContent += `
        <div style="margin-bottom: 20px;">
          <img style="height:70px; width:70px;" src="${item.image || ""}" alt="Product Image"/>
          <h1 style="color: black;">${item.title || ""}</h1>
          <h3 style="color: black;">Quantity: ${item.quantity || ""}</h3>
          <h3 style="color: black;">RS/- ${item.price || ""}</h3>
          
          <hr style="width:100%;" />
        </div>
      `; 
    });
    htmlContent += "</div>";

    // User Details
    let htmlContent2 = "<div>";
    userDetails.forEach((data) => {
      htmlContent2 += `
        <div>
          <h3 style="color: black;"><u>Customer Details</u></h3>
          <p style="color: black;">Full Name: <b style="color: black;">${data.fullname || ""}</b></p>
          <p style="color: black;">Contact Number: <b style="color: black;">${data.contactnumber || ""}</b></p>
          <p style="color: black;">Address: <b style="color: black;">${data.address || ""}</b></p>
          <p style="color: black;">Date: <b style="color: black;">${new Date().toLocaleString()}</b></p>
          <hr style="width:100%;" />
        </div>
      `;
    });
    htmlContent2 += "</div>";

    const htmlContent3=`
    <h3 style="color: black;"><u>Total Amount</u></h3>
    <div style="border:1px solid black;>
    <p style="color:red;">Total Price: <b style="color: red;">RS/- ${totalPrice || ""}</b></p>
    <p style="color: green;">(-discount: <b style="color: green;"> 10%)</b></p>
    </div>
    `

    // Combine both contents with styles
    const finalHtml = `
      <div>
        ${styles}
        <h3 style="color: black;">Purchase Details</h3>
        ${htmlContent}
        ${htmlContent3}
        ${htmlContent2}
      </div>
    `;

    const mailOptions = {
      from: process.env.USER_NAME,
      to: process.env.USER_NAME_TO,
      subject: "Purchased Product Details",
      html: finalHtml,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const responsData ={
      cartItems,
      totalPrice
    }

    res.status(200).send(responsData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'An error occurred while processing the purchase.' });
  }
};

module.exports = purchasedProduct;

