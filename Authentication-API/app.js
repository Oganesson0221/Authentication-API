const express = require("express");
const { default: mongoose } = require("mongoose");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

//!Connect to mongoDB

mongoose
  .connect(
    "mongodb+srv://*********:******@cluster0.1yrcnpc.mongodb.net/***********" //add the connection string here
  )
  .then(() => console.log("DB connected successfully"))
  .catch((e) => console.log(e));

//To be able to pass the incoming data to our client side we have to be able to configure our server to do that

//! Middlewares

app.use(express.json()); //pass the incoming json data from the user

//! Routes

app.use("/", router);

//! Error handler

app.use(errorHandler);

//! Start the server

const PORT = 5050;
app.listen(PORT, console.log(`Server is up and running`));
