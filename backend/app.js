const express = require("express");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const commRoutes = require("./routes/comment");
const { join } = require("path");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());
app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comm", commRoutes);

module.exports = app;
