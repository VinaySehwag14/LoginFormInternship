require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors);

//* Connect to MongoDB

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB DATABSE");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

//* CORS applied
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With, Content-Type , Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on ${port} port");
});
