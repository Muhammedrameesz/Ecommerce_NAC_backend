const express = require("express");
const app = new express();
const morgan = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT || 5200;
const cors = require("cors");
const DBconnection = require("./DB/DBconnect");
const router = require("./Routes");

const allowedOrigins = [
  "https://ecommerce-nac-frontend.vercel.app",
  "https://ecommerce-nac-frontend-git-main-muhammedrameeszs-projects.vercel.app",
  "https://ecommerce-nac-frontend-mi3e7ybt7-muhammedrameeszs-projects.vercel.app",
];

DBconnection();

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(morgan("dev"));
app.use(express.json());
app.use("/", router);

app.all("*", (req, res) => {
  res.status(404).send("404 not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
