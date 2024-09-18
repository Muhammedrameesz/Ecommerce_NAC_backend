const express = require("express");
const app = new express();
const morgan = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT || 5200;
const cors = require("cors");
const DBconnection = require("./DB/DBconnect");
const router = require("./Routes");


DBconnection();

app.use(cors({
  origin: '*'
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
