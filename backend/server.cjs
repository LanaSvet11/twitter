/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
require("dotenv").config();
require("./config/database.cjs");
const User = require("./models/User.cjs");
const Tweet = require("./models/Tweet.cjs");
const path = require("path");

const {
  createTweet,
  getTweets,
  updateTweet,
  deleteTweet,
} = require("./controllers/tweets.cjs");

const app = express();

// START MIDDLEWARE //
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(helmet());

// CRUD - Create, Read, Update, Delete

// C
app.post("/tweets", createTweet);

// R
app.get("/tweets", getTweets);

// U send ID in params. Send update stuff in req.body
app.put("/tweets/:tweetId/:newTitle", updateTweet);

// D
app.delete("/tweets/:tweetId", deleteTweet);

// Route for user sign-up
app.post("/users/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ email, password });

    // Save the user to the database
    await newUser.save();

    return res.status(200).send({ message: "Sign-up successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "An error occurred during sign-up" });
  }
});

app.listen(4002, () => {
  console.log("listening on 4002");
});
