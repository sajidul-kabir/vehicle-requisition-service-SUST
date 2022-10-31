const express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ origin: ["http://localhost:8080"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hi");
});

module.exports = app;
